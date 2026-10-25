# Configuration

`open77-ts.json` is the file the compiler reads. `ts77.config.json` and `ts77.config.ts` are optional overlays. Fields in an overlay replace the same fields for that build. The overlay is not written back over `open77-ts.json`.

`ts77 deploy --server <directory>` is the command that does write `serverResourcesDir`. It looks for `server.jsonc` and then uses the `resources` folder inside that server directory.

A `ts77.config.ts` file must export an object. The compiler transpiles it in memory. Keep it free of gameplay code.

`open77-ts.json` sits next to the resource directory name. The `name` field and the directory name must be the same slug: a lowercase letter, then letters, digits, or underscores, 3 to 64 characters.

## Fields

```json
{
  "name": "player_notes",
  "version": "1.0.0",
  "autoStart": true,
  "targets": ["open77-client", "open77-server", "node", "webui"],
  "client": "src/client/index.ts",
  "server": "src/server/index.ts",
  "backend": "src/backend/index.ts",
  "dependencies": [],
  "permissions": [],
  "serverResourcesDir": "D:/open77-server/resources",
  "web": {
    "root": "src/webui",
    "entry": "web/index.html",
    "devEntry": "http://127.0.0.1:5173/"
  }
}
```

| Field | Default | Meaning |
|---|---|---|
| `version` | required | Written into `open77.lua`. |
| `autoStart` | `true` | `auto_start` in the manifest. |
| `targets` | client, server, plus `webui` if `web.root` is set, plus `node` if `backend` is set | Which compilers run. |
| `client` | `src/client/main.ts` | Client bundle entry. |
| `server` | `src/server/main.ts` | Server bundle entry. |
| `backend` | none | Node entry. Required when `node` is listed. |
| `dependencies` | `[]` | Other resource names, emitted as `dependency`. |
| `permissions` | `[]` | Extra manifest permissions, unioned with natives the scanner found. |
| `serverResourcesDir` | none | Destination parent for `--deploy`. |
| `web.root` | none | Folder that contains `vite.config` and `package.json`. |
| `web.entry` | `web/index.html` | Page the production build opens. |
| `web.devEntry` | none | Page used when building with `--dev`. |

`permissions` you list are kept even if the scanner did not see that native. The scanner still adds the permissions for natives that were actually called. It does not remove one you listed.

## Targets

| Target | Compiler | Output |
|---|---|---|
| `open77-client` | TypeScriptToLua 5.4, bundled | `dist/client/main.lua` |
| `open77-server` | TypeScriptToLua 5.4, bundled | `dist/server/main.lua` |
| `node` | `tsc`, CommonJS, ES2022 | `dist/backend/index.js` |
| `webui` | Vite | `web/` |

Shared gameplay modules live in `src/shared` and are copied into each Lua bundle that imports them. They are not `shared_script` files. The Node program does not compile `src/shared` unless the backend file imports it. The notes example keeps the Lua contracts in `src/shared/contracts.ts` and lets the companion use `@open77-ts/shared`.

## Generated files

Each build rewrites:

- `src/generated/flags.ts` — `webuiEntry`
- `tsconfig.json` for the editor, plus `tsconfig.client.json`, `tsconfig.server.json`, and `tsconfig.node.json` when those targets run
- `dist/client/main.lua` and `.map`
- `dist/server/main.lua` and `.map`
- `dist/backend/index.js`
- `open77.lua`

The editor reads `tsconfig.json`, which selects the client or server project for the open file. Completion follows the catalogue. Client files cannot see `TriggerClientEvent`. Server files cannot see `TriggerServerEvent`.

## Companion environment

| Variable | Default | Used by |
|---|---|---|
| `OPEN77_BRIDGE_SECRET` | none, and the process refuses to start | HMAC key. 16–256 characters. |
| `OPEN77_BRIDGE_PORT` | `11782` | Listen port. |
| `OPEN77_NOTES_DRIVER` | `memory` | `memory`, `mysql`, `postgres`, or `redis`. |
| `OPEN77_DATABASE_URL` | none | Required unless the driver is `memory`. |

## Game-server settings the resource reads

`Open77.tunables.declare` registers:

| Key | Default | Purpose |
|---|---|---|
| `open77_bridge_secret` | `""` | Same secret as `OPEN77_BRIDGE_SECRET`. Empty means calls fail with `bridge_secret_missing`. |
| `open77_bridge_url` | `http://127.0.0.1:11782/v1/call` | Where `Open77.http.request` posts. |

`Open77.convars.get` is checked first. Resolution order on the server is: an in-memory `SetConvar`, the `convars` block of `server.jsonc`, then this resource's tunable of the same name, then the caller's default. A value set in Warden is visible on the next read because the code reads it at the call, not at file load.

String tunables are capped at 256 characters by the host. That is why the companion also rejects a longer secret.

## server.jsonc

Only the fields this bridge uses:

```jsonc
{
  "http": {
    "enabled": true,
    "allowedHosts": ["127.0.0.1"],
    "timeoutSeconds": 5,
    "maxResponseBytes": 1048576
  },
  "httpHandlers": {
    "enabled": true,
    "listenUrl": "http://127.0.0.1:11781",
    "timeoutSeconds": 5
  }
}
```

`allowedHosts` entries are exact hosts (`discord.com`) or one subdomain wildcard (`*.example.com`). No scheme, path, or port. An empty list reaches nothing.

`httpHandlers.listenUrl` is an `http://` origin with no path. The listener adds `/<resource>/<prefix>` itself. Sixteen requests may be in flight per resource. A larger body than 16 KiB is refused before Lua sees it. A handler that never answers is timed out by the host.

The resource manifest still has to list `http.request` and, if it serves a route, `http.serve`. The build adds those when it sees the calls.
