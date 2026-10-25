# Node companion

`@open77-ts/node` is a Fastify process. It is started with Node, not with the game server, and it is not loaded into the Lua VM. Native addons are not injected into OPEN//77.

## Start

```ts
import { startCompanion } from "@open77-ts/node";

const companion = await startCompanion({
    secret: process.env.OPEN77_BRIDGE_SECRET ?? "",
    host: "127.0.0.1",
    port: Number(process.env.OPEN77_BRIDGE_PORT ?? 11782),
    driver: "memory",
    databaseUrl: process.env.OPEN77_DATABASE_URL,
    filesRoot: "data",
    corsOrigins: ["http://127.0.0.1:5173"],
    rateLimit: 30,
    rateWindowMs: 10_000,
});
companion.jobs.every(60_000, () => undefined);
```

The default host is `127.0.0.1`. A secret shorter than 16 characters, or longer than 256, throws before the port opens. `close()` stops timers, closes WebSockets, and closes Fastify.

`open77-ts dev` and `open77-ts watch` spawn `node dist/backend/index.js` after a successful build and kill that process before the next build. The environment of the CLI is the environment of the child, so export `OPEN77_BRIDGE_SECRET` first.

The example backend also listens for `SIGINT` and `SIGTERM` and calls `close()`. A hard kill from the watcher does not run that handler. The port is released because the process exits.

## What the process can do

The Node program may use `fs`, `path`, `crypto`, `http`, `net`, `stream`, and any npm package it depends on. The repository depends on `fastify`, `@fastify/cors`, `zod`, `ws`, `mysql2`, `pg`, and `ioredis`.

## Your own packages

`require` and `import` in `src/backend` are Node's loader. They are not compiled into Lua. The dedicated-server sandbox still has no `require`, and a client `require` only loads Lua files the manifest publishes.

From the resource directory:

```text
npm install rethinkdb chalk
```

```ts
const chalk = require("chalk");
const r = require("rethinkdb");
import { createResourceRequire } from "@open77-ts/node";

const local = createResourceRequire(process.cwd());
local("rethinkdb");
```

`chalk` is in that example because it is a normal npm package. Use the CommonJS release if you call `require`. An ESM-only package is loaded with `import()`. Packages resolve from the resource's `node_modules`, then from the toolchain's `node_modules`. `open77-ts dev` and `open77-ts watch` set `NODE_PATH` that way when they spawn the process.

A package with no types still compiles. The compiler writes `src/backend/open77-npm.d.ts` so `require("rethinkdb")` typechecks. If the package is not installed, the build stops and tells you the `npm install` command. It does not emit a companion that would crash on startup.

`createResourceRequire(resourceDir)` is the same loader with two extra refusals: an absolute path, and a relative path that leaves the resource. It also refuses `@open77-ts/client`, `@open77-ts/server`, `@open77-ts/webui`, and `@open77/sdk/*`. Those are gameplay surfaces. The Node process is the sandbox boundary. It is a separate operating-system process, and it cannot grant money, items, permissions, or vehicles.

A local file next to the entry is a normal TypeScript import, `import { label } from "./label"`. The compiler emits every `.ts` file under `src/backend`.

| Piece | API |
|---|---|
| HTTP server | Fastify on `/health`, `/v1/call`, `/v1/webhook` |
| WebSocket | `ws` attached to the same HTTP server at `/v1/events` |
| Notes | `MemoryNoteStore`, `SqlNoteStore`, `RedisNoteStore` |
| Files | `safePath`, `readWithin` |
| Jobs | `JobRunner.every` / `stop` |
| Calling the game | `callGame` |

## Stores

`notes.save` writes one row keyed by the request id. A second successful call with the same id returns the first row.

| Driver | Behavior |
|---|---|
| `memory` | A `Map` in the process. Gone when the process exits. |
| `mysql` | `CREATE TABLE IF NOT EXISTS open77_notes (...)` and `INSERT ... ON DUPLICATE KEY UPDATE id = id`. |
| `postgres` | The same table and `INSERT ... ON CONFLICT (id) DO NOTHING`. |
| `redis` | `SET open77:note:<id> <json> NX`. If the key exists, the stored JSON is returned. |

`openStore(driver, url)` picks one of those. The example reads `OPEN77_NOTES_DRIVER` and `OPEN77_DATABASE_URL`. Tests use the memory store and call the SQL and Redis classes with fake clients, so a database does not have to be running.

The table columns are `id`, `player_id`, `body` (the note text), and `saved_at`.

## Files

`safePath(root, requestPath)` resolves the path and refuses empty paths, paths longer than 180 characters, NUL, and any path whose relative form starts with `..` or is absolute. `readWithin` then reads UTF-8 up to 16 KiB.

`files.read` is only registered as a useful call when `filesRoot` was passed to `startCompanion`. Otherwise it returns `files_disabled`. The notes example does not set `filesRoot`. Turning it on does not give the page or the client that directory. The caller still needs a valid HMAC from the game server.

## Jobs

`JobRunner.every(ms, fn)` uses `setInterval`. `stop` clears every timer. The example schedules a 60 second no-op so a long-running process has a handle it can shut down cleanly. There is no job queue on disk.

## Calling the game

```ts
import { callGame } from "@open77-ts/node";

const result = await callGame({
    origin: "http://127.0.0.1:11781",
    resource: "player_notes",
    secret: process.env.OPEN77_BRIDGE_SECRET ?? "",
    method: "notes.ping",
    payload: {},
    timeoutMs: 5000,
});
```

This `POST`s `http://127.0.0.1:11781/player_notes/bridge`. The game resource must have called `serveBackend()`, the manifest must include `http.serve`, and `httpHandlers` must be enabled. A connection error returns `{ ok: false, error: "game_offline" }`. A timeout returns `timeout`.

`callGame` does not grant items, money, or vehicles. The Lua handler you registered with `onBackendCall` decides what the method does. An unknown method is `unknown_method`.

## Authority

The companion trusts a request that carries a valid signature. It does not check that a player is online. The game server is supposed to do that before it asks for `notes.save`. Do not expose `/v1/call` to the browser, and do not let the page decide `playerId`.
