const { test } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const luaparse = require("luaparse");
const { buildResource, doctor, mapLuaPosition, validateResource } = require("../packages/compiler/dist/index.js");
const { jsKind, netProblem } = require("../packages/sdk/dist/net.js");

const root = path.resolve(__dirname, "..");
const hello = path.join(root, "examples", "hello_world");

test("declarations match catalogue 2.50.0+op77.148 and keep client and server apart", () => {
    const client = fs.readFileSync(path.join(root, "packages/types/generated/client.d.ts"), "utf8");
    const server = fs.readFileSync(path.join(root, "packages/types/generated/server.d.ts"), "utf8");
    assert.match(client, /OPEN\/\/77 client declarations for catalogue build 2\.50\.0\+op77\.148/);
    assert.match(client, /TriggerServerEvent\(this: void, event: string, \.\.\.args: unknown\[\]\): boolean;/);
    assert.match(client, /@permission network\.events/);
    assert.doesNotMatch(client, /TriggerClientEvent\(this: void/);
    assert.match(server, /TriggerClientEvent\(this: void, event: string, playerId: number, \.\.\.args: unknown\[\]\): LuaMultiReturn/);
    assert.doesNotMatch(server, /TriggerServerEvent\(this: void/);
    assert.doesNotMatch(client + server, /GiveWeaponToPed/);
    assert.match(server, /declare const source: number \| undefined;/);
});

test("network values reject functions, cycles, and non-finite numbers", () => {
    assert.equal(netProblem({ text: "Night City" }, jsKind), undefined);
    assert.equal(netProblem(() => undefined, jsKind), "network_payload_not_serializable");
    const box = { name: "loop" };
    box.self = box;
    assert.equal(netProblem(box, jsKind), "network_payload_not_serializable");
    assert.equal(netProblem(Number.NaN, jsKind), "network_payload_not_serializable");
    assert.equal(netProblem(Number.POSITIVE_INFINITY, jsKind), "network_payload_not_serializable");
});

test("hello_world compiles to Lua 5.4 bundles with native call syntax", async () => {
    const result = buildResource(hello, { buildWeb: false });
    assert.equal(result.ok, true, result.messages.join("\n"));
    assert.deepEqual(result.permissions, ["network.events"]);
    const client = fs.readFileSync(path.join(hello, "dist/client/main.lua"), "utf8");
    const server = fs.readFileSync(path.join(hello, "dist/server/main.lua"), "utf8");
    luaparse.parse(client, { luaVersion: "5.3" });
    luaparse.parse(server, { luaVersion: "5.3" });
    assert.match(client, /local ____originalRequire = nil/);
    assert.match(server, /local ____originalRequire = nil/);
    assert.doesNotMatch(client, /____originalRequire = require/);
    assert.doesNotMatch(server, /____originalRequire = require/);
    assert.doesNotMatch(client + server, /setmetatable|debug\.getinfo|debug\.traceback/);
    assert.match(client, /Open77\.webui\.create\(/);
    assert.match(client, /page:send\(/);
    assert.match(client, /page:on\(/);
    assert.match(client, /TriggerServerEvent\(/);
    assert.doesNotMatch(client, /TriggerClientEvent\(/);
    assert.match(server, /TriggerClientEvent\(/);
    assert.match(server, /json\.encode\(/);
    assert.match(server, /local ok, reason = TriggerClientEvent/);
    assert.doesNotMatch(server, /TriggerServerEvent\(|Open77\.webui/);
    assert.match(server, /while index <= 32/);
    assert.match(server, /local index = 1/);
    const validation = validateResource(hello);
    assert.equal(validation.ok, true, validation.messages.join("\n"));
    const greetLine = server.split(/\r?\n/).findIndex((line) => line.includes("Hello, ")) + 1;
    assert.ok(greetLine > 0);
    const mapped = await mapLuaPosition(path.join(hello, "dist/server/main.lua"), greetLine, 0);
    assert.equal(mapped?.source?.endsWith("src/shared/greeting.ts"), true);
    assert.equal(typeof mapped?.line, "number");
});

test("type errors and unsupported syntax keep the TypeScript path", () => {
    const dir = path.join(os.tmpdir(), "open77 ts test", "bad_client");
    fs.rmSync(dir, { recursive: true, force: true });
    const created = spawnSync(process.execPath, [path.join(root, "packages/cli/dist/cli.js"), "create", "bad_client", "--template", "basic", "--out", dir], { encoding: "utf8" });
    assert.equal(created.status, 0, created.stderr);
    fs.writeFileSync(path.join(dir, "src/client/main.ts"), "TriggerClientEvent(\"nope\", 1);\nasync function later(): Promise<void> { await Promise.resolve(); }\n");
    const result = buildResource(dir, { buildWeb: false });
    assert.equal(result.ok, false);
    const text = result.messages.join("\n");
    assert.match(text, /main\.ts:\d+/);
    assert.match(text, /async\/await|TriggerClientEvent|Cannot find name 'TriggerClientEvent'/);
});

test("doctor accepts the example resource", () => {
    const lines = doctor(hello);
    assert.equal(lines.some((line) => line.level === "fail"), false, JSON.stringify(lines));
});
