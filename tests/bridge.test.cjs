const { test } = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const luaparse = require("luaparse");
const { WebSocket } = require("ws");
const { buildResource, validateResource } = require("../packages/compiler/dist/index.js");
const { scanLua } = require("../packages/compiler/dist/permissions.js");
const { canonical, signEnvelope, signaturesMatch } = require("../packages/shared/dist/index.js");
const { hmacSha256Hex, sha256Hex } = require("../packages/shared/dist/sha256.js");
const { startCompanion, callGame, MemoryNoteStore, SqlNoteStore, RedisNoteStore, safePath, JobRunner, createResourceRequire } = require("../packages/node/dist/index.js");

const root = path.resolve(__dirname, "..");
const notes = path.join(root, "examples", "player_notes");
const secret = "test-secret-value";

function signed(method, payload, extra = {}) {
    return signEnvelope(secret, {
        resource: extra.resource ?? "player_notes",
        id: extra.id ?? "note-id-1000",
        method,
        timestamp: extra.timestamp ?? Date.now(),
        nonce: extra.nonce ?? "nonce-" + crypto.randomBytes(8).toString("hex"),
        payload,
    });
}

async function post(url, body) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
    });
    return { status: response.status, body: await response.json() };
}

test("comments and strings are not treated as native calls", () => {
    const catalogue = require("../packages/types/generated/catalogue.json");
    const source = "-- Open77.vehicles.spawn(\nlocal text = \"Open77.http.request(\"\nprint(\"ok\")\n";
    const result = scanLua(source, "server", catalogue);
    assert.deepEqual(result.permissions, []);
    assert.deepEqual(result.unknown, []);
});

test("portable SHA-256 and HMAC match Node's crypto", () => {
    assert.equal(sha256Hex("abc"), crypto.createHash("sha256").update("abc").digest("hex"));
    assert.equal(sha256Hex(""), crypto.createHash("sha256").update("").digest("hex"));
    const message = "The quick brown fox jumps over the lazy dog";
    assert.equal(hmacSha256Hex("key", message), crypto.createHmac("sha256", "key").update(message).digest("hex"));
    assert.equal(canonical({ b: 1, a: "x" }), '{"a":"x","b":1}');
    assert.equal(canonical({}), "{}");
    assert.equal(canonical([]), "{}");
    assert.equal(canonical([1, "a"]), '[1,"a"]');
    const disconnect = signed("bridge.disconnect", {}, { id: "disc-id-1000", nonce: "nonce-disc-01" });
    assert.equal(signaturesMatch(secret, JSON.parse(JSON.stringify(disconnect))), true);
});

test("the companion stores a note once, rejects replays, and stays off the public web", async () => {
    const store = new MemoryNoteStore();
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "open77-notes-"));
    fs.writeFileSync(path.join(directory, "kept.txt"), "kept", "utf8");
    const companion = await startCompanion({
        secret,
        host: "127.0.0.1",
        port: 0,
        store,
        filesRoot: directory,
        rateLimit: 20,
        rateWindowMs: 60_000,
    });
    try {
        const health = await fetch(companion.url + "/health");
        assert.equal(health.status, 200);
        const save = signed("notes.save", { playerId: 4, text: "Night City" }, { id: "note-id-1000", nonce: "nonce-save-01" });
        const first = await post(companion.url + "/v1/call", save);
        assert.equal(first.status, 200, JSON.stringify(first.body));
        assert.equal(first.body.result.text, "Night City");
        assert.equal(store.size(), 1);
        const replay = await post(companion.url + "/v1/call", save);
        assert.equal(replay.status, 401);
        const again = signed("notes.save", { playerId: 4, text: "Night City" }, { id: "note-id-1000", nonce: "nonce-save-02" });
        const second = await post(companion.url + "/v1/call", again);
        assert.equal(second.status, 200);
        assert.equal(store.size(), 1);
        const badText = signed("notes.save", { playerId: 4, text: "" }, { id: "note-id-2000" });
        assert.equal((await post(companion.url + "/v1/call", badText)).status, 400);
        const stale = signed("notes.save", { playerId: 4, text: "late" }, { id: "note-id-3000", timestamp: Date.now() - 120_000 });
        assert.equal((await post(companion.url + "/v1/call", stale)).status, 401);
        const forged = signed("notes.save", { playerId: 4, text: "forged" }, { id: "note-id-4000" });
        forged.signature = "0".repeat(64);
        assert.equal(signaturesMatch(secret, forged), false);
        assert.equal((await post(companion.url + "/v1/call", forged)).status, 401);
        const file = signed("files.read", { path: "kept.txt" }, { id: "file-id-1000" });
        const read = await post(companion.url + "/v1/call", file);
        assert.equal(read.body.result.text, "kept");
        const escaped = signed("files.read", { path: "../secret.txt" }, { id: "file-id-2000" });
        assert.equal((await post(companion.url + "/v1/call", escaped)).body.error, "path_rejected");
        const hook = signed("webhook.receive", { kind: "ping" }, { id: "hook-id-1000" });
        const hooked = await post(companion.url + "/v1/webhook", hook);
        assert.equal(hooked.body.result.accepted, true);
        const socket = new WebSocket(companion.url.replace("http", "ws") + "/v1/events");
        await new Promise((resolve, reject) => {
            socket.once("open", resolve);
            socket.once("error", reject);
        });
        const hello = signed("bridge.hello", {}, { id: "socket-id-1" });
        const ready = new Promise((resolve) => socket.once("message", (data) => resolve(JSON.parse(data.toString()))));
        socket.send(JSON.stringify(hello));
        assert.equal((await ready).result.ready, true);
        const pong = new Promise((resolve) => socket.once("message", (data) => resolve(JSON.parse(data.toString()))));
        socket.send(JSON.stringify({ type: "ping" }));
        assert.equal((await pong).type, "pong");
        socket.close();
    } finally {
        await companion.close();
    }
});

test("a stopped companion and a stopped game listener fail closed", async () => {
    await assert.rejects(() => startCompanion({ secret: "short", port: 0 }));
    const offline = await callGame({
        origin: "http://127.0.0.1:1",
        resource: "player_notes",
        secret,
        method: "notes.ping",
        payload: {},
        timeoutMs: 400,
    });
    assert.equal(offline.ok, false);
    assert.ok(offline.error === "game_offline" || offline.error === "timeout");

    const server = http.createServer((request, response) => {
        const chunks = [];
        request.on("data", (chunk) => chunks.push(chunk));
        request.on("end", () => {
            const envelope = JSON.parse(Buffer.concat(chunks).toString("utf8"));
            if (request.url !== "/player_notes/bridge" || !signaturesMatch(secret, envelope)) {
                response.writeHead(401, { "content-type": "application/json" });
                response.end(JSON.stringify({ ok: false, error: "unauthorized" }));
                return;
            }
            response.writeHead(200, { "content-type": "application/json" });
            response.end(JSON.stringify({ ok: true, result: { pong: true } }));
        });
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    try {
        const result = await callGame({
            origin: `http://127.0.0.1:${address.port}`,
            resource: "player_notes",
            secret,
            method: "notes.ping",
            payload: {},
            timeoutMs: 1000,
        });
        assert.equal(result.ok, true);
        assert.equal(result.result.pong, true);
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
});

test("database adapters and the file sandbox keep their boundaries", async () => {
    const sql = [];
    const store = new SqlNoteStore(async (statement, params) => {
        sql.push(statement);
        return params;
    }, "postgres");
    await store.ensure();
    await store.save({ id: "note-id-1000", playerId: 2, text: "row", savedAt: 10 });
    assert.match(sql[0], /CREATE TABLE IF NOT EXISTS open77_notes/);
    assert.match(sql[1], /ON CONFLICT \(id\) DO NOTHING/);
    const redis = new RedisNoteStore({
        async set() { return null; },
        async get() { return JSON.stringify({ id: "note-id-1000", playerId: 2, text: "row", savedAt: 10 }); },
    });
    const existing = await redis.save({ id: "note-id-1000", playerId: 9, text: "new", savedAt: 11 });
    assert.equal(existing.text, "row");
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "open77-files-"));
    assert.equal(safePath(directory, "../outside.txt"), undefined);
    assert.equal(path.basename(safePath(directory, "note.txt")), "note.txt");
    const jobs = new JobRunner();
    let ticks = 0;
    jobs.every(15, () => { ticks += 1; });
    await new Promise((resolve) => setTimeout(resolve, 40));
    jobs.stop();
    const stopped = ticks;
    await new Promise((resolve) => setTimeout(resolve, 40));
    assert.equal(ticks, stopped);
    assert.ok(stopped > 0);
});

test("player_notes compiles every target and keeps the secret off the client", () => {
    const result = buildResource(notes);
    assert.equal(result.ok, true, result.messages.join("\n"));
    assert.ok(result.permissions.includes("network.events"));
    assert.ok(result.permissions.includes("http.request"));
    assert.ok(result.permissions.includes("http.serve"));
    const client = fs.readFileSync(path.join(notes, "dist/client/main.lua"), "utf8");
    const server = fs.readFileSync(path.join(notes, "dist/server/main.lua"), "utf8");
    luaparse.parse(client, { luaVersion: "5.3" });
    luaparse.parse(server, { luaVersion: "5.3" });
    assert.doesNotMatch(client, /Open77\.http\.request|open77_bridge_secret|setmetatable/);
    assert.match(server, /Open77\.http\.request/);
    assert.match(server, /Open77\.http\.listen/);
    assert.match(server, /Open77\.tunables\.declare/);
    assert.match(server, /Open77\.convars\.get/);
    assert.match(server, /backend_offline/);
    assert.match(server, /4294967296/);
    assert.doesNotMatch(client, /4294967296/);
    assert.match(fs.readFileSync(path.join(notes, "dist/backend/index.js"), "utf8"), /@open77-ts\/node/);
    assert.equal(fs.existsSync(path.join(notes, "web/index.html")), true);
    const validation = validateResource(notes);
    assert.equal(validation.ok, true, validation.messages.join("\n"));
});

test("client Lua and the companion reject each other's imports", () => {
    const dir = path.join(os.tmpdir(), "open77 ts bridge", "bad_bridge");
    fs.rmSync(dir, { recursive: true, force: true });
    const created = spawnSync(process.execPath, [path.join(root, "packages/cli/dist/cli.js"), "create", "bad_bridge", "--template", "basic", "--out", dir], { encoding: "utf8" });
    assert.equal(created.status, 0, created.stderr);
    fs.writeFileSync(path.join(dir, "src/client/main.ts"), "import { readFileSync } from \"fs\";\nexport const value = readFileSync;\n");
    const client = buildResource(dir, { buildWeb: false });
    assert.equal(client.ok, false);
    assert.match(client.messages.join("\n"), /fs/);

    const config = JSON.parse(fs.readFileSync(path.join(dir, "open77-ts.json"), "utf8"));
    config.backend = "src/backend/index.ts";
    fs.writeFileSync(path.join(dir, "open77-ts.json"), JSON.stringify(config));
    fs.mkdirSync(path.join(dir, "src/backend"), { recursive: true });
    fs.writeFileSync(path.join(dir, "src/backend/index.ts"), "import { emitServer } from \"@open77-ts/client\";\nexport const value = emitServer;\n");
    fs.writeFileSync(path.join(dir, "src/client/main.ts"), "print(\"ok\");\n");
    const backend = buildResource(dir, { buildWeb: false });
    assert.equal(backend.ok, false);
    assert.match(backend.messages.join("\n"), /Node companion cannot import/);
});

test("backend require loads npm packages outside the Lua sandbox", () => {
    const dir = path.join(root, "spike", "pkg_sandbox");
    fs.rmSync(dir, { recursive: true, force: true });
    const created = spawnSync(process.execPath, [path.join(root, "packages/cli/dist/cli.js"), "create", "pkg_sandbox", "--template", "basic", "--out", dir], { encoding: "utf8" });
    assert.equal(created.status, 0, created.stderr);
    const config = JSON.parse(fs.readFileSync(path.join(dir, "open77-ts.json"), "utf8"));
    config.backend = "src/backend/index.ts";
    fs.writeFileSync(path.join(dir, "open77-ts.json"), JSON.stringify(config));
    fs.mkdirSync(path.join(dir, "src/backend"), { recursive: true });
    fs.mkdirSync(path.join(dir, "src/modules"), { recursive: true });
    fs.mkdirSync(path.join(dir, "node_modules/chalk"), { recursive: true });
    fs.mkdirSync(path.join(dir, "node_modules/rethinkdb"), { recursive: true });
    fs.writeFileSync(path.join(dir, "node_modules/chalk/package.json"), JSON.stringify({ name: "chalk", main: "index.js" }));
    fs.writeFileSync(path.join(dir, "node_modules/chalk/index.js"), "module.exports = { green(text) { return text; } };\n");
    fs.writeFileSync(path.join(dir, "node_modules/rethinkdb/package.json"), JSON.stringify({ name: "rethinkdb", main: "index.js" }));
    fs.writeFileSync(path.join(dir, "node_modules/rethinkdb/index.js"), "module.exports = { ok: true };\n");
    fs.writeFileSync(path.join(dir, "src/modules/tools.ts"), "export function twice(value: number): number {\n    return value * 2;\n}\n");
    fs.writeFileSync(path.join(dir, "src/backend/label.ts"), "export const label = \"notes\";\n");
    fs.writeFileSync(path.join(dir, "src/backend/index.ts"), [
        "import { label } from \"./label\";",
        "const chalk = require(\"chalk\") as { green(text: string): string };",
        "const db = require(\"rethinkdb\") as { ok: boolean };",
        "process.stdout.write(chalk.green(label) + \":\" + String(db.ok) + \"\\n\");",
        "",
    ].join("\n"));
    fs.writeFileSync(path.join(dir, "src/client/main.ts"), [
        "import { loadModule } from \"@open77-ts/client\";",
        "const tools = loadModule<{ twice(value: number): number }>(\"modules.tools\");",
        "print(tostring(tools));",
        "",
    ].join("\n"));
    const built = buildResource(dir, { buildWeb: false });
    assert.equal(built.ok, true, built.messages.join("\n"));
    const client = fs.readFileSync(path.join(dir, "dist/client/main.lua"), "utf8");
    const server = fs.readFileSync(path.join(dir, "dist/server/main.lua"), "utf8");
    const moduleLua = fs.readFileSync(path.join(dir, "modules/tools.lua"), "utf8");
    luaparse.parse(client, { luaVersion: "5.3" });
    luaparse.parse(moduleLua, { luaVersion: "5.3" });
    assert.match(client, /_G\.require/);
    assert.doesNotMatch(server, /rethinkdb|chalk/);
    assert.doesNotMatch(moduleLua, /setmetatable|rethinkdb/);
    assert.match(fs.readFileSync(path.join(dir, "open77.lua"), "utf8"), /file "modules\/tools.lua"/);
    const companion = spawnSync(process.execPath, [path.join(dir, "dist/backend/index.js")], { encoding: "utf8", cwd: dir });
    assert.equal(companion.status, 0, companion.stderr);
    assert.match(companion.stdout, /notes:true/);
    const loader = createResourceRequire(dir);
    assert.equal(loader("chalk").green("ok"), "ok");
    assert.equal(loader("rethinkdb").ok, true);
    assert.throws(() => loader("@open77-ts/client"), /module_rejected/);
    assert.throws(() => loader("E:/outside.js"), /module_rejected/);
    assert.throws(() => loader("../package.json"), /module_rejected|Cannot find module/);

    fs.writeFileSync(path.join(dir, "src/server/main.ts"), "const db = require(\"rethinkdb\");\nprint(db);\n");
    const serverRequire = buildResource(dir, { buildWeb: false });
    assert.equal(serverRequire.ok, false);
    assert.match(serverRequire.messages.join("\n"), /sandbox/);

    fs.writeFileSync(path.join(dir, "src/server/main.ts"), "print(\"ok\");\n");
    fs.writeFileSync(path.join(dir, "src/client/main.ts"), "import chalk from \"chalk\";\nprint(chalk);\n");
    const clientPackage = buildResource(dir, { buildWeb: false });
    assert.equal(clientPackage.ok, false);
    assert.match(clientPackage.messages.join("\n"), /chalk/);
});
