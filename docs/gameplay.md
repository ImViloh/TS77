# Gameplay

Client code compiles to client Lua. Server code compiles to server Lua. Both are Lua 5.4. Each side is one bundle. The server bundle cannot call the global `require`. The client sandbox removes `setmetatable`, so classes are rejected before emit.

## Layout

```text
my_resource/
├── src/
│   ├── client/index.ts
│   ├── server/index.ts
│   ├── shared/contracts.ts
│   └── generated/flags.ts      # rewritten by the build
├── dist/client/main.lua
├── dist/server/main.lua
├── open77.lua
└── open77-ts.json
```

Import the SDK from `@open77-ts/client` or `@open77-ts/server`. The older `@open77/sdk/client` and `@open77/sdk/server` paths still resolve to the same files.

## Client

```ts
import { createPage, emitServer, onClientResourceStart, onClientResourceStop, onNet } from "@open77-ts/client";

onClientResourceStart(() => {
    print(GetCurrentResourceName());
});

onClientResourceStop(() => {
    print("client stopped");
});
```

| Function | Host event or native |
|---|---|
| `onClientResourceStart` | `onClientResourceStart`, filtered to this resource |
| `onClientResourceStop` | `onClientResourceStop`, filtered to this resource |
| `onNet(event, handler)` | `RegisterNetEvent` |
| `emitServer(event, payload)` | `TriggerServerEvent` after a structural check and a size check |
| `createPage(options)` | `Open77.webui.create` for `hud` or `menu` |
| `clearHandlers()` | `Open77.events.off` for ids this module recorded |

`createPage` also registers `onClientResourceStop` and calls `page:destroy()`. The host destroys the surface on resource stop as well. `hud` and `menu` do not need a WebUI permission. Modal, system, and debug are not offered by the helper.

`emitServer` refuses a reserved event name, a function, a cycle, a non-finite number, and a payload whose JSON is larger than 48 KiB. The event itself is still limited to 32 arguments by the host.

## Server

```ts
import { authenticatedPlayer, emitClient, onNet, onResourceStart, onResourceStop, onCommand } from "@open77-ts/server";

onResourceStart(() => {
    print("started");
});

onNet("demo:ping", (payload) => {
    const player = authenticatedPlayer();
    if (player === undefined) return;
    emitClient(player, "demo:pong", payload);
});

onCommand("hello", false, (player, args) => {
    if (player < 1) {
        print("console");
        return;
    }
    emitClient(player, "hello:notice", { text: args[0] ?? "" });
});
```

| Function | Host |
|---|---|
| `onResourceStart` / `onResourceStop` | The matching server events, filtered to this resource |
| `onNet` | `RegisterNetEvent`. `source` is the authenticated player during the handler. |
| `authenticatedPlayer()` | `source` when it is a number greater than or equal to 1 |
| `emitClient(playerId, event, payload)` | `TriggerClientEvent`. Target `0` is refused. `-1` means every player. |
| `onCommand(name, restricted, handler)` | `RegisterCommand`. Arguments are read from Lua index 1. |

`authenticatedPlayer()` is the only identity a net handler should trust. A field inside the payload is not a player id. The notes example copies `source` into the companion request and ignores any id the client might have added.

`onCommand` receives `player === 0` at the server console. That value is not a client target. Chat arguments arrive as a 1-based Lua array. The helper copies them into a TypeScript `string[]`, so `args[0]` is the first word the user typed.

## Calls and returns

Namespace functions are declared `this: void`, so TypeScriptToLua emits a dot call: `Open77.webui.create(...)`, `TriggerServerEvent(...)`, `Open77.http.request(...)`.

`WebUI.Page`, `Open77.Promise`, and `Open77.EventVerdict` are instance methods and emit colon calls: `page:send(...)`, `page:on(...)`, `page:destroy()`.

A native that returns a value and a reason is a `LuaMultiReturn`. Destructure it:

```ts
const [page, reason] = Open77.webui.create({ entry: "web/index.html", layer: "hud" });
const [ok, failure] = TriggerClientEvent("demo:pong", playerId, payload);
const [accepted, refusal] = Open77.http.request(url, callback, "POST", body);
```

`undefined` and `null` both become Lua `nil`.

## What gameplay TypeScript cannot use

The syntax checker rejects, with a file and line:

- `class`
- `async` / `await`
- `Promise`, `Map`, `Set`, `WeakMap`, `WeakSet` as values
- `console`, `process`, `Buffer`, `fetch`, `setTimeout`, `setInterval`, and Node's `require()`
- `node:` imports, `fs`, `rethinkdb`, `chalk`, and any other npm package
- `@open77-ts/node` and `@open77-ts/webui`
- the server SDK from a client file, and the client SDK from a server file
- `@open77-ts/shared/protocol` and the SHA-256 module from a client file

## Client modules and npm packages

Node's `require("rethinkdb")` and `require("chalk")` are rejected in `src/client` and `src/server`. The server sandbox has no `require`. The client `require` loads a Lua file, not an npm package.

Put the package in `src/backend` and install it in the resource directory. See [Companion](companion.md).

A Lua module you wrote in TypeScript goes in `src/modules`. `src/modules/tools.ts` is emitted as `modules/tools.lua` and published with `file`. `src/modules/tools/index.ts` is emitted as `modules/tools/init.lua`. The client loads it by the dot name:

```ts
import { loadModule } from "@open77-ts/client";

const tools = loadModule<{ twice(value: number): number }>("modules.tools");
```

That call is `_G.require`, the sandbox loader, so the bundle's own module table does not swallow it. `loadModule("@polyzone")` is the dependency form. The name allows letters, digits, underscores, hyphens, and dots. The server cannot call `loadModule`. Import shared TypeScript from `src/shared` instead, and it is bundled into the server script.

`SetTimeout` and `ClearTimeout` are real server natives. The banned name is the JavaScript `setTimeout`.

`Wait` and `CreateThread` are the scheduler. An `Open77.Promise` returned by a native is a host object. It is not a JavaScript promise.

## Events

Names starting with a reserved prefix are refused. The list is generated from the Devkit `events.json` and includes `open77:dash:`, `open77:abilities:`, and the other `open77:*` families in `packages/sdk/src/shared/reserved.ts`. Do not raise `open77:*` yourself.

Payloads that cross the network must be JSON: nil, booleans, finite numbers, strings, and acyclic tables with string or integer keys. The helper walks that shape before the native is called. The host limit is 32 arguments and 48 KiB of JSON.

## Resource lifecycle

| Moment | What the toolchain does |
|---|---|
| Client start | Your `onClientResourceStart` handler runs. `createPage` opens the surface. |
| Client stop | `page:destroy()` runs for each page `createPage` returned. The host drops the surface either way. |
| Server start | Your `onResourceStart` handler runs. `serveBackend()` registers `POST /<resource>/bridge`. |
| Server stop or reload | The host drops HTTP routes and event handlers. The bridge increments a generation counter, ignores late HTTP callbacks, and best-effort posts `bridge.disconnect`. |

A reload starts a new Lua VM. Nonces and rate counters in that VM are empty again. The Node process is separate and keeps running until you stop it.
