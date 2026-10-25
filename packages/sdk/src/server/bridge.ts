import { parseJsonText, readEnvelope, signEnvelope, signaturesMatch } from "../../../shared/src/protocol";

/**
 * Server-side HTTP bridge to the Node companion.
 * The secret is a convar or this resource's tunable. It is read here, on the server, and is not imported by client code.
 * Outbound calls use Open77.http.request. Inbound calls use Open77.http.listen. OPEN//77 does not document a Lua WebSocket client.
 */

const bridgeSettings = Open77.tunables.declare({
    open77_bridge_secret: { value: "", type: "string", apply: "live", label: "Bridge secret", description: "Shared with the Node companion. Empty until an operator sets it." },
    open77_bridge_url: { value: "http://127.0.0.1:11782/v1/call", type: "string", apply: "live", label: "Bridge URL" },
});

let generation = 0;
let sequence = 0;
let windowStarted = 0;
let windowHits = 0;
const seenNonces: string[] = [];
const inboundNames: string[] = [];
const inboundHandlers: Array<(this: void, payload: unknown) => unknown> = [];

function setting(name: string, fallback: string): string {
    const configured = Open77.convars.get(name, "");
    if (typeof configured === "string" && configured.length > 0) return configured;
    const declared = bridgeSettings[name];
    if (typeof declared === "string" && declared.length > 0) return declared;
    return fallback;
}

function bridgeSecret(): string {
    return setting("open77_bridge_secret", "");
}

function bridgeUrl(): string {
    return setting("open77_bridge_url", "http://127.0.0.1:11782/v1/call");
}

function nextId(): string {
    sequence += 1;
    return String(Math.floor(Open77.time.unix() * 1000)) + "-" + String(sequence);
}

function nextNonce(): string {
    return String(Math.floor(Open77.time.unix() * 1000)) + "-" + String(Math.floor(Math.random() * 1000000000));
}

function rememberNonce(nonce: string): boolean {
    for (let index = 0; index < seenNonces.length; index++) {
        if (seenNonces[index] === nonce) return false;
    }
    seenNonces.push(nonce);
    if (seenNonces.length > 64) seenNonces.shift();
    return true;
}

function allowInbound(): boolean {
    const now = Open77.time.unix();
    if (now - windowStarted >= 10) {
        windowStarted = now;
        windowHits = 0;
    }
    windowHits += 1;
    return windowHits <= 30;
}

export function onBackendCall(method: string, handler: (this: void, payload: unknown) => unknown): void {
    inboundNames.push(method);
    inboundHandlers.push(handler);
}

function reply(response: unknown, status: number, body: unknown): void {
    const target = response as { json?: (this: void, code: number, value: unknown) => void };
    if (typeof target.json !== "function") return;
    target.json(status, body);
}

function handleInbound(request: unknown, response: unknown): void {
    const req = request as { method?: unknown; body?: unknown };
    if (req.method !== "POST") {
        reply(response, 405, { ok: false, error: "method_not_allowed" });
        return;
    }
    const secret = bridgeSecret();
    if (secret === "") {
        reply(response, 401, { ok: false, error: "bridge_secret_missing" });
        return;
    }
    const decoded = typeof req.body === "string" ? parseJsonText(req.body, (text) => json.decode(text)) : req.body;
    const envelope = readEnvelope(decoded);
    if (envelope === undefined) {
        reply(response, 400, { ok: false, error: "invalid_envelope" });
        return;
    }
    const now = Math.floor(Open77.time.unix() * 1000);
    const delta = now > envelope.timestamp ? now - envelope.timestamp : envelope.timestamp - now;
    if (delta > 30000 || !signaturesMatch(secret, envelope) || !rememberNonce(envelope.nonce)) {
        reply(response, 401, { ok: false, error: "unauthorized" });
        return;
    }
    if (!allowInbound()) {
        reply(response, 429, { ok: false, error: "rate_limited" });
        return;
    }
    let handler: ((this: void, payload: unknown) => unknown) | undefined;
    for (let index = 0; index < inboundNames.length; index++) {
        if (inboundNames[index] === envelope.method) handler = inboundHandlers[index];
    }
    const found = handler;
    if (found === undefined) {
        reply(response, 404, { ok: false, error: "unknown_method" });
        return;
    }
    const payload = envelope.payload;
    const [ok, value] = pcall(() => found(payload));
    if (!ok) {
        reply(response, 500, { ok: false, id: envelope.id, error: "handler_error" });
        return;
    }
    reply(response, 200, { ok: true, id: envelope.id, result: value });
}

/** Registers `POST /<resource>/bridge`. The host drops the route when this resource stops. */
export function serveBackend(): void {
    const [route, reason] = Open77.http.listen("/bridge", (request: unknown, response: unknown) => {
        handleInbound(request, response);
    });
    if (route === undefined) print("Open77.http.listen /bridge unavailable: " + tostring(reason));
    else print("bridge listening on " + tostring(route));
}

function dispatch(
    url: string,
    secret: string,
    id: string,
    method: string,
    payload: unknown,
    ticket: number,
    callback: (this: void, result: unknown, failure: string | undefined) => void,
    idempotent: boolean,
    attempt: number,
): void {
    if (ticket !== generation) {
        callback(undefined, "resource_stopped");
        return;
    }
    const envelope = signEnvelope(secret, {
        resource: GetCurrentResourceName(),
        id,
        method,
        timestamp: Math.floor(Open77.time.unix() * 1000),
        nonce: nextNonce(),
        payload,
    });
    const body: Open77Table = {
        resource: envelope.resource,
        id: envelope.id,
        method: envelope.method,
        timestamp: envelope.timestamp,
        nonce: envelope.nonce,
        signature: envelope.signature,
        payload: envelope.payload as Open77Table,
    };
    const settled = { done: false };
    const timer = SetTimeout(5000, () => {
        if (settled.done) return;
        settled.done = true;
        if (ticket !== generation) return;
        if (idempotent && attempt < 1) dispatch(url, secret, id, method, payload, ticket, callback, true, attempt + 1);
        else callback(undefined, "timeout");
    });
    const [accepted, refusal] = Open77.http.request(url, (status: unknown, responseBody: unknown, _headers: unknown, _err: unknown) => {
        if (settled.done) return;
        settled.done = true;
        ClearTimeout(timer);
        if (ticket !== generation) return;
        if (typeof status !== "number" || status === 0) {
            if (idempotent && attempt < 1) {
                dispatch(url, secret, id, method, payload, ticket, callback, true, attempt + 1);
                return;
            }
            callback(undefined, "backend_offline");
            return;
        }
        if (typeof responseBody !== "string") {
            callback(undefined, "bad_response");
            return;
        }
        const decoded = json.decode(responseBody);
        if (typeof decoded !== "object" || decoded === null) {
            callback(undefined, "bad_response");
            return;
        }
        const record = decoded as { ok?: unknown; result?: unknown; error?: unknown };
        if (record.ok === true) callback(record.result, undefined);
        else callback(undefined, typeof record.error === "string" ? record.error : "backend_error");
    }, "POST", body);
    if (accepted !== true && !settled.done) {
        settled.done = true;
        ClearTimeout(timer);
        if (ticket !== generation) return;
        callback(undefined, typeof refusal === "string" ? refusal : "request_refused");
    }
}

/**
 * Asks the companion to run `method`. The callback runs on this resource's tick.
 * `idempotent` retries once, with the same request id, when the connection fails or the deadline passes.
 * A resource stop invalidates the callback.
 */
export function callNode(
    method: string,
    payload: unknown,
    callback: (this: void, result: unknown, failure: string | undefined) => void,
    idempotent?: boolean,
): void {
    const ticket = generation;
    const secret = bridgeSecret();
    if (secret === "") {
        callback(undefined, "bridge_secret_missing");
        return;
    }
    dispatch(bridgeUrl(), secret, nextId(), method, payload, ticket, callback, idempotent === true, 0);
}

AddEventHandler("onResourceStop", (resourceName: unknown) => {
    if (resourceName !== GetCurrentResourceName()) return;
    const secret = bridgeSecret();
    const url = bridgeUrl();
    generation += 1;
    if (secret === "") return;
    const envelope = signEnvelope(secret, {
        resource: GetCurrentResourceName(),
        id: nextId(),
        method: "bridge.disconnect",
        timestamp: Math.floor(Open77.time.unix() * 1000),
        nonce: nextNonce(),
        payload: {},
    });
    Open77.http.request(url, () => undefined, "POST", {
        resource: envelope.resource,
        id: envelope.id,
        method: envelope.method,
        timestamp: envelope.timestamp,
        nonce: envelope.nonce,
        signature: envelope.signature,
        payload: {},
    });
});

export function bridgeIsCurrent(ticket: number): boolean {
    return ticket === generation;
}
