# Manifests

`open77.lua` is a manifest DSL. It is not a Lua program. `auto_start true` is legal in the DSL and illegal in Lua, so the tests do not parse the manifest with luaparse. They parse the script bundles.

The build rewrites the file. Edit `open77-ts.json` and the TypeScript, then build again.

## What is emitted

```lua
-- [OPEN77-TS] generated for catalogue 2.50.0+op77.148
resource "player_notes"
version "1.0.0"
auto_start true

client_script "dist/client/main.lua"
server_script "dist/server/main.lua"

permissions {
    "http.request",
    "http.serve",
    "network.events",
}

web_file "web/assets/index-Bfyf_gBU.js"
web_file "web/assets/index-BsJ9NAsl.css"
web_file "web/index.html"
```

A target that was not built does not get a script line. An empty script glob is never written. `**` is never written.

| Directive | Source |
|---|---|
| `resource`, `version`, `auto_start` | `open77-ts.json` |
| `client_script` | Present when `open77-client` was built |
| `server_script` | Present when `open77-server` was built |
| `dependency` | `dependencies`, sorted |
| `permissions` | Union of `permissions` in the config and natives found in the bundles, sorted. Omitted when empty. |
| `file` | Every file under `files/`, plus generated client modules under `modules/`, except `.map` |
| `web_file` | Every file under `web/`, except `.map` |

`files/` is for images and data the client must download. Drop a file in that directory and rebuild. Paths are explicit. A missing file fails `open77-ts validate`.

There is no `ui_page` directive in this catalogue. Pages are created at runtime with `Open77.webui.create`.

`shared_script` is not used. Shared TypeScript is compiled into the client bundle and the server bundle separately. The server has no module loader.

`reload_policy` is left at the host default, `transactional`.

## How permissions are chosen

The scanner reads the Lua, skips comments and string literals, and records calls. Namespaced calls are `Open77.*`, `Citizen.*`, `json.*`, and `WebUI.*`. A bare name is recorded only when it exists in the catalogue, so Lua base functions and TypeScriptToLua helpers are ignored. A call that exists only on the other runtime fails the build. A namespaced call the catalogue does not know fails the build.

Colon calls such as `page:send` are methods on a value the script already holds. The permission, when there is one, belongs to the native that created the value. `Open77.webui.create` for `hud` and `menu` does not add a permission. `Open77.http.request` adds `http.request`. `Open77.http.listen` adds `http.serve`. `TriggerServerEvent` and `TriggerClientEvent` add `network.events`.

## Deploy

`open77-ts build --deploy` copies `open77.lua`, `dist`, and `web` into `serverResourcesDir/<name>`. The directory name must already match the resource slug. The command does not call `reload`. On the server console that command is `reload <name>`.

The Node program is not a manifest script. Run it on the server machine with `node dist/backend/index.js` and the secret in the environment. Copying `dist` copies the JavaScript. It does not start it.
