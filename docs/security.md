# Security

## Where the secret lives

The HMAC key is `OPEN77_BRIDGE_SECRET` in the Node environment and `open77_bridge_secret` on the game server. The server value is read with `Open77.convars.get`, which also sees the resource tunable of that name. The tunable's default in code is an empty string. An empty secret does not sign traffic. `callNode` returns `bridge_secret_missing` and the inbound route answers 401.

The client bundle is delivered to players. The build of `player_notes` is checked so that `dist/client/main.lua` does not contain `open77_bridge_secret`, `Open77.http.request`, or the SHA-256 constant. The page bundle is also delivered to players. It does not import the protocol module. Do not re-export `@open77-ts/shared`'s codec from a file the client imports. Gameplay imports resolve `@open77-ts/shared` to `contracts.ts` only.

Do not put the secret in `server.jsonc`. That file is operator configuration and the schema says credentials belong in the environment. A Warden tunable is visible to operators of that server. That is the supported place to set the game-side copy, because Lua cannot read process environment variables. There is no `getenv` native in this catalogue.

## What a valid signature is allowed to do

A signed `notes.save` stores a row. It does not pay a player, spawn a vehicle, or change permissions. Those actions stay in server Lua, behind `authenticatedPlayer()` and the permission the native requires. The companion does not check that the player is connected. If the secret leaks, the holder can store notes as any player id. Treat the secret like a database password.

`files.read` can read files inside `filesRoot` and nowhere else. `..`, absolute paths, and NUL are rejected. The notes example leaves `filesRoot` unset, so the method returns `files_disabled`.

## Replay, time, and retries

Receivers store nonces and reject a repeat. The timestamp must sit within 30 seconds. An idempotent retry is a new nonce and the same request id, so a lost response can be repeated without a second insert. The idempotency cache lasts 60 seconds and only stores successes.

Rate limits apply after the signature check. The companion default is 30 requests per resource per 10 seconds. The Lua inbound route allows 30 per 10 seconds as well.

## Browser

Fastify CORS allows `GET` from `http://127.0.0.1:5173`. `POST /v1/call` is not a CORS method, and the page does not have the secret. A health check cannot mutate state.

`127.0.0.1` in the page is the player's PC when the surface runs on their machine. Pointing the page at the companion is a development convenience, not the authority path.

## Sandbox

The compiler refuses Node built-ins in Lua and in the page, refuses the Node package in Lua, and refuses the client SDK in the companion. That is a compile-time wall, not a runtime filter inside the game. Do not bypass it by concatenating a Lua string that calls `os` or `debug`. Those libraries are not in the sandbox, and a bundle that mentions `debug.getinfo` or `debug.traceback` fails the build. A client bundle that mentions `setmetatable` fails the build.

## Manifest permissions

Permissions are resource-wide. The build adds only the permissions for natives it found, plus any you listed. `player_notes` gets `network.events`, `http.request`, and `http.serve`. A resource that does not call `Open77.http.listen` does not get `http.serve`. `hello_world` gets `network.events` only.

Requesting `http.request` does nothing until `http.enabled` is true and the host is on `allowedHosts`. Requesting `http.serve` does nothing until `httpHandlers.enabled` is true.

## Resource stop

Stopping or reloading the resource drops its HTTP routes and its event handlers. Pending `callNode` callbacks see a new generation and return `resource_stopped` instead of applying a late result. The companion process is not killed by a resource reload. Stop it yourself, or let `open77-ts watch` restart it when the TypeScript changes.
