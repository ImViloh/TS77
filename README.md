# TS77

Compile OPEN//77 resources from TypeScript. Gameplay becomes Lua 5.4. A separate Node process runs backend services. React interfaces stay JavaScript inside the game's Chromium surface. Native names, parameters, and permissions come from the OPEN//77 Devkit catalogue, which in this workspace is **2.50.0+op77.148**.

The long-form guide is in [docs/README.md](docs/README.md). [docs/index.html](docs/index.html) is the same guide as one page for GitHub Pages: set the site source to the `/docs` folder on the branch you publish.

The server sandbox has no global `require` and no `debug` library. The compiler bundles each side into one Lua file and keeps source maps on your machine.

## Requirements

- Node.js 20 or newer
- An OPEN//77 server. This repo was checked against the server at `E:\CODING\VOSS`
- The Devkit index cache created by `npx -y @open2077/mcp init --server-dir <server>`

## Install

```bash
npm install
npm run build:tools
```

`build:tools` compiles the compiler and regenerates `packages/types/generated` from the Devkit index.

## Create a plugin

The npm package name is `ts77`. `open77-ts` is the same program.

```bash
npx ts77 create my_plugin --template basic --no-install
cd my_plugin
npm install
npm run dev
npm run build
```

`npm run dev` watches TypeScript and rebuilds Lua. Add `--server <server-directory>` at create time, or later run `npx ts77 deploy --server <server-directory>`, to copy the resource into that server's `resources` folder. TS77 does not reload the dedicated server.

```bash
npx open77-ts create my_resource --template basic
npx open77-ts create my_job --template gameplay
npx open77-ts create my_hud --template webui
npx open77-ts create my_notes --template fullstack
```

The directory name and `open77-ts.json` `name` must match: a lowercase letter, then letters, digits, or underscores, 3 to 64 characters.

```bash
npx open77-ts build my_resource
npx open77-ts watch my_resource
npx open77-ts validate my_resource
npx open77-ts doctor my_resource
```

`init` writes the basic template into an existing directory. `dev` watches TypeScript and, when `ui/` has Vite installed, starts the WebUI dev server at `http://127.0.0.1:5173/`.

To copy a built resource into a server, set `serverResourcesDir` in `open77-ts.json` and run `npx open77-ts build <resource> --deploy`. Reloading a running server is a console command on that server (`reload <name>`). This CLI does not send it.

## Write gameplay

Client code lives in `src/client`, server code in `src/server`, and modules imported by either side in `src/shared`. Shared modules are copied into each bundle. They are not `shared_script` files and they do not call `require` at runtime.

```ts
import { emitServer, onClientResourceStart, onNet } from "@open77/sdk/client";
import { greet } from "../shared/greeting";

onClientResourceStart(() => {
    print(greet(GetCurrentResourceName()));
    const ok = emitServer("demo:ping", { text: "Night City" });
    if (!ok) print("demo:ping was not sent");
});
```

```ts
import { authenticatedPlayer, emitClient, onNet } from "@open77/sdk/server";

onNet("demo:ping", (payload) => {
    const player = authenticatedPlayer();
    if (player === undefined) return;
    emitClient(player, "demo:pong", payload);
});
```

`authenticatedPlayer()` reads the server-assigned `source`. A client cannot choose that id. Check payload fields before using them, and do not let a client grant money, items, or character changes.

Natives are the real catalogue functions. `Open77.webui.create`, `TriggerServerEvent`, and `TriggerClientEvent` are called with a dot. Page methods such as `page:send` use a colon. A native that returns a value and a reason is destructured so both Lua results are kept:

```ts
const [page, reason] = Open77.webui.create({ entry: "web/index.html" });
const [ok, failure] = TriggerClientEvent("demo:pong", playerId, payload);
```

Cursor reads `tsconfig.client.json` or `tsconfig.server.json` in the resource. Those files are rewritten on each build and point at the generated declarations, so completion follows the catalogue.

A client file cannot see `TriggerClientEvent`. A server file cannot see `TriggerServerEvent`. `class`, `async`, `Promise`, `Map`, `Set`, and Node.js imports are compile errors.

The build writes `open77.lua` with the Lua files that were actually produced and the permissions of the natives it found. `network.events` is added when the resource sends or receives network events. Empty script globs are not written.

## React WebUI

The `webui` template and `examples/hello_world` put a Vite React app in `ui/`. `npm run build` inside `ui/` writes `web/`, and the manifest lists those files one by one. The page talks to Lua through the documented bridge:

```ts
window.Open77?.on("hud:state", (payload) => render(payload));
window.Open77?.emit("hud:ping", { text: "Night City" });
window.Open77?.ready();
```

Lua listens with `page.on` and sends with `page.send`. For Vite during development, build with `--dev` or set the WebUI entry to `http://127.0.0.1:5173/`. That address is the player's PC. Call `Open77.ready()` again after a hot reload so Lua can send the current state.

`hud` and `menu` do not need a WebUI permission. `modal`, `system`, and `debug` do, and the helper does not offer them.

## Targets

A resource lists the runtimes it actually builds. The defaults are client Lua, server Lua, a WebUI when `web.root` is set, and a Node companion when `backend` is set.

| Target | Result |
|---|---|
| `open77-client` | One Lua 5.4 client bundle |
| `open77-server` | One Lua 5.4 server bundle |
| `node` | CommonJS from `src/backend`, run with Node.js 22 |
| `webui` | Vite bundle from `src/webui` or `ui` |

`@open77-ts/client`, `@open77-ts/server`, and `@open77-ts/shared` are compiled into Lua. `@open77-ts/shared` in gameplay is the contract module: plain values and checks, no Node APIs. `@open77-ts/node` is the companion and is rejected in a Lua or page build. `@open77-ts/webui` is the page bridge and is rejected in Lua. The older `@open77/sdk/client` and `@open77/sdk/server` names still resolve.

`npx open77-ts create my_notes --template fullstack` writes `src/client`, `src/server`, `src/backend`, `src/webui`, and `src/shared`. `dev` rebuilds those targets, restarts `dist/backend/index.js` when that file exists, and starts Vite when its dependencies are installed. Set `OPEN77_BRIDGE_SECRET` in the environment before starting the companion. The game server reads the same value from the `open77_bridge_secret` convar or from that resource's tunable. Leave it empty and the server reports `bridge_secret_missing` instead of calling out.

The companion listens on `127.0.0.1:11782` unless `OPEN77_BRIDGE_PORT` is set. The dedicated server must enable outbound HTTP and allow that host:

```jsonc
"http": { "enabled": true, "allowedHosts": ["127.0.0.1"] }
```

`http.allowedHosts` is a hostname, not a URL. Inbound calls from Node use `httpHandlers` and `Open77.http.listen`, which is off until the operator enables it. `OPEN77_NOTES_DRIVER` may be `memory` (the default), `mysql`, `postgres`, or `redis`. The database URL is `OPEN77_DATABASE_URL`. File reads stay inside the root configured on the companion and reject `..`.

`examples/player_notes` is the full path: the React page emits `notes:submit`, client Lua sends `notes:save`, the server checks `authenticatedPlayer()` and the text, `Open77.http.request` calls `notes.save`, and the page renders the saved text or `backend_offline`. The page's health `fetch` does not save anything. Saving does not grant money, items, or vehicles. No play session in Cyberpunk 2077 was run for this example.

## Debugging

Type errors name the TypeScript file and line. Lua is formatted by TypeScriptToLua and carries a source map next to the bundle. The sandbox cannot run `debug.traceback`, so the map is applied by the CLI:

```bash
npx open77-ts map examples/hello_world/dist/server/main.lua 120
```

When the map has a position, the output looks like:

```text
[OPEN77-TS] Resource: hello_world

Runtime Error:
src/shared/greeting.ts:2
```

## Updating OPEN//77

When a newer Devkit index is published, refresh the MCP cache and run `npm run generate` (or `npx open77-ts types`). Declarations, permissions, and reserved event prefixes are rewritten from that index. Do not hand-edit `packages/types/generated`.

## Example

`examples/hello_world` is a client, a server, a shared greeting module, a typed ping, and a React HUD.

- The server registers `/hello` with `RegisterCommand`. Arguments arrive as strings. A console `source` of `0` is not sent to a client, because target `0` is a host error.
- The page emits `hud:ping`. The client sends `hello:ping`. The server checks the payload and replies to `authenticatedPlayer()` with `hello:notice`.
- The client updates the HUD with `page.send`.

```bash
npx open77-ts build examples/hello_world
npx open77-ts validate examples/hello_world
npm test
```

Build, Lua parse, call syntax, the `require` shim, and source-map lookup are covered by `npm test`. `open77_validate` is the Devkit's static check. Neither one replaces joining the server in Cyberpunk 2077.

See [docs/limitations.md](docs/limitations.md) for the runtime restrictions and what this project does not claim.
