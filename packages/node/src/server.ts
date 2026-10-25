import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { WebSocketServer, type WebSocket } from "ws";
import { z } from "zod";
import { isNoteText, parseJsonText, readEnvelope, signaturesMatch, type Envelope } from "@open77-ts/shared";
import { readWithin } from "./files";
import { Idempotency, allowRate, freshTimestamp, rememberNonce } from "./guard";
import { JobRunner } from "./jobs";
import { MemoryNoteStore, openStore, type NoteStore } from "./store";

const NoteSave = z.object({
    playerId: z.number().int().positive(),
    text: z.string().min(1).max(96),
}).strict();

const FileRead = z.object({
    path: z.string().min(1).max(180),
}).strict();

const IDEMPOTENT = new Set(["notes.save", "files.read", "bridge.disconnect", "notes.ping", "webhook.receive"]);

export interface CompanionOptions {
    secret: string;
    host?: string;
    port?: number;
    store?: NoteStore;
    driver?: "memory" | "mysql" | "postgres" | "redis";
    databaseUrl?: string;
    filesRoot?: string;
    corsOrigins?: string[];
    rateLimit?: number;
    rateWindowMs?: number;
}

export interface Companion {
    port: number;
    url: string;
    store: NoteStore;
    jobs: JobRunner;
    close(): Promise<void>;
}

export async function startCompanion(options: CompanionOptions): Promise<Companion> {
    if (options.secret.length < 16 || options.secret.length > 256) {
        throw new Error("OPEN77_BRIDGE_SECRET must be 16 to 256 characters");
    }
    const host = options.host ?? "127.0.0.1";
    const store = options.store ?? await openStore(options.driver ?? "memory", options.databaseUrl);
    const jobs = new JobRunner();
    const nonces = new Map<string, number>();
    const buckets = new Map<string, { count: number; reset: number }>();
    const idempotency = new Idempotency(60_000);
    const limit = options.rateLimit ?? 30;
    const windowMs = options.rateWindowMs ?? 10_000;

    const methods = new Map<string, (envelope: Envelope) => Promise<unknown>>();
    methods.set("notes.save", async (envelope) => {
        const parsed = NoteSave.safeParse(envelope.payload);
        if (!parsed.success || !isNoteText(parsed.data.text)) throw new Error("invalid_payload");
        return store.save({
            id: envelope.id,
            playerId: parsed.data.playerId,
            text: parsed.data.text,
            savedAt: Date.now(),
        });
    });
    methods.set("files.read", async (envelope) => {
        if (!options.filesRoot) throw new Error("files_disabled");
        const parsed = FileRead.safeParse(envelope.payload);
        if (!parsed.success) throw new Error("invalid_payload");
        return { text: readWithin(options.filesRoot, parsed.data.path) };
    });
    methods.set("bridge.disconnect", async () => ({ cleared: true }));
    methods.set("notes.ping", async () => ({ pong: true }));
    methods.set("webhook.receive", async (envelope) => ({ accepted: true, payload: envelope.payload }));

    const app = Fastify({ logger: false, bodyLimit: 16_384 });
    await app.register(cors, {
        origin: options.corsOrigins ?? ["http://127.0.0.1:5173"],
        methods: ["GET"],
    });
    app.get("/health", async () => ({ ok: true }));

    const accept = async (request: FastifyRequest, reply: FastifyReply) => {
        const raw = typeof request.body === "string"
            ? parseJsonText(request.body, (text) => {
                try {
                    return JSON.parse(text) as unknown;
                } catch {
                    return undefined;
                }
            })
            : request.body;
        const envelope = readEnvelope(raw);
        if (!envelope) return reply.code(400).send({ ok: false, id: "", error: "invalid_envelope" });
        const now = Date.now();
        if (!freshTimestamp(envelope.timestamp, now) || !signaturesMatch(options.secret, envelope) || !rememberNonce(nonces, envelope.nonce, now)) {
            return reply.code(401).send({ ok: false, id: envelope.id, error: "unauthorized" });
        }
        if (!allowRate(buckets, envelope.resource, now, limit, windowMs)) {
            return reply.code(429).send({ ok: false, id: envelope.id, error: "rate_limited" });
        }
        const handler = methods.get(envelope.method);
        if (!handler) return reply.code(404).send({ ok: false, id: envelope.id, error: "unknown_method" });
        try {
            const result = IDEMPOTENT.has(envelope.method)
                ? await idempotency.once(envelope.resource + "\n" + envelope.id, now, () => handler(envelope))
                : await handler(envelope);
            return reply.code(200).send({ ok: true, id: envelope.id, result });
        } catch (error) {
            const message = error instanceof Error ? error.message : "rejected";
            const code = message === "invalid_payload" || message === "path_rejected" || message === "files_disabled" || message === "file_too_large" ? 400 : 500;
            return reply.code(code).send({ ok: false, id: envelope.id, error: message });
        }
    };
    app.post("/v1/call", accept);
    app.post("/v1/webhook", accept);

    await app.listen({ host, port: options.port ?? 11782 });
    const address = app.server.address();
    const port = typeof address === "object" && address ? address.port : options.port ?? 11782;
    const sockets = new WebSocketServer({ server: app.server, path: "/v1/events" });
    sockets.on("connection", (socket: WebSocket) => {
        let trusted = false;
        socket.once("message", (raw) => {
            let body: unknown;
            try {
                body = JSON.parse(raw.toString());
            } catch {
                socket.close(4001, "unauthorized");
                return;
            }
            const envelope = readEnvelope(body);
            const now = Date.now();
            if (!envelope || envelope.method !== "bridge.hello" || !freshTimestamp(envelope.timestamp, now) || !signaturesMatch(options.secret, envelope) || !rememberNonce(nonces, envelope.nonce, now)) {
                socket.close(4001, "unauthorized");
                return;
            }
            trusted = true;
            socket.send(JSON.stringify({ ok: true, result: { ready: true } }));
        });
        socket.on("message", (raw) => {
            if (!trusted) return;
            let body: unknown;
            try {
                body = JSON.parse(raw.toString());
            } catch {
                return;
            }
            const kind = typeof body === "object" && body !== null ? (body as { type?: unknown }).type : undefined;
            if (kind === "ping") socket.send(JSON.stringify({ type: "pong" }));
        });
    });

    return {
        port,
        url: `http://${host}:${port}`,
        store,
        jobs,
        async close() {
            jobs.stop();
            for (const client of sockets.clients) client.close();
            sockets.close();
            await app.close();
        },
    };
}
