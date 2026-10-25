# Install

## What you need

- Node.js 20 or newer to run the compiler. The companion process is written for Node.js 22 or newer. `open77-ts doctor` fails below 20 and warns below 22.
- An OPEN//77 dedicated server. This repository was checked against the server at `E:\CODING\VOSS`.
- The Devkit index produced by:

```bash
npx -y @open2077/mcp init --server-dir <server-directory>
```

The generator reads the newest `cards.json` under `~/.open77/mcp/index`, or the directory in `OPEN77_INDEX_DIR`. It refuses cards whose `since` is missing or newer than that index. The embedded npm copy of the Devkit is older and is not used.

## Install the toolchain

From the repository root:

```bash
npm install
npm run build:tools
```

`build:tools` compiles the type generator, compiler, and CLI, regenerates `packages/types/generated` from the index, then compiles the shared codec and the Node companion. After that, `npx open77-ts` runs `packages/cli/dist/cli.js`.

`npm test` runs `build:tools` and then `tests/framework.test.cjs` and `tests/bridge.test.cjs`.

## Packages the compiler resolves

These import names are resolved from inside the `ts2077` package. They are not separate packages on the public npm registry.

| Import | Runs in | Source |
|---|---|---|
| `@open77-ts/client` and `@open77/sdk/client` | Client Lua | `packages/sdk/src/client` |
| `@open77-ts/server` and `@open77/sdk/server` | Server Lua | `packages/sdk/src/server` |
| `@open77-ts/server/bridge` | Server Lua | `packages/sdk/src/server/bridge.ts` |
| `@open77-ts/shared` in gameplay | Lua | `packages/shared/src/contracts.ts` |
| `@open77-ts/shared` in Node | Node | `packages/shared` (contracts plus the codec) |
| `@open77-ts/node` | Node only | `packages/node` |
| `@open77-ts/webui` | The page only | `packages/webui/src/index.ts` |

A Lua build or a page build that imports `@open77-ts/node`, `fs`, `mysql2`, `pg`, `ioredis`, `fastify`, or `zod` is a compiler error. A page that imports the client or server SDK is a compiler error. A Node file that imports the client, server, or WebUI SDK is a compiler error.

## WebUI dependencies

Vite and React are installed in the interface folder, not at the repository root. For the notes example:

```bash
npm install --prefix examples/player_notes/src/webui
node examples/player_notes/src/webui/node_modules/esbuild/install.js
```

The second command is required when npm blocks esbuild's postinstall script. Without the binary, `vite build` cannot run. The `webui` template uses `ui/` instead of `src/webui/` and needs the same two commands there.

## Server configuration the companion needs

Outbound HTTP is off until `server.jsonc` names a destination. `allowedHosts` is a hostname with no scheme, path, or port:

```jsonc
"http": { "enabled": true, "allowedHosts": ["127.0.0.1"] }
```

That entry allows `http://127.0.0.1:11782/...`. Redirects are never followed.

The reverse direction, Node calling the game, uses the opt-in listener:

```jsonc
"httpHandlers": { "enabled": true, "listenUrl": "http://127.0.0.1:11781", "timeoutSeconds": 5 }
```

It is plain HTTP, loopback by default, and off until `enabled` is true. A resource that calls `Open77.http.listen` while the listener is off gets `http_handlers_unavailable` and keeps running. Outbound calls do not need this block.

## Secret

Generate one shared secret, 16 to 256 characters. Put it in the environment of the Node process:

```bash
# PowerShell
$env:OPEN77_BRIDGE_SECRET = "replace-with-16-or-more-chars"
```

On the game server, set the same value as the convar or tunable `open77_bridge_secret`. The resource declares that tunable with an empty default. Do not write the secret into `server.jsonc`, client TypeScript, or the page. The schema for `convars` says that file is the wrong place for credentials.

`OPEN77_BRIDGE_PORT` defaults to `11782`. `OPEN77_NOTES_DRIVER` is `memory`, `mysql`, `postgres`, or `redis`. `OPEN77_DATABASE_URL` is required for the three database drivers.

## Regenerating declarations

When a newer Devkit index is published:

```bash
npx -y @open2077/mcp init --server-dir <server-directory>
npm run generate
```

`npx open77-ts types` runs the same generator. Do not hand-edit `packages/types/generated` or `packages/sdk/src/shared/reserved.ts`.
