# Examples

Neither example has been played inside Cyberpunk 2077 as part of this repository's checks. `npm test` compiles them. `open77_validate` has compiled `hello_world` and `player_notes` with the server's Lua. Join a server before treating gameplay as verified.

## hello_world

`examples/hello_world` is a client, a server, a shared greeting, and a React HUD in `ui/`.

1. The page calls `ready()` and emits `hud:ping` with `{ text: "Night City" }`.
2. The client checks the payload and emits `hello:ping`.
3. The server reads `authenticatedPlayer()`, checks the payload again, and emits `hello:notice` to that player only.
4. The client sends `hud:state` to the page.

The command `/hello` is registered with `RegisterCommand`. A console `source` of 0 is not sent to a client, because target 0 is a host error. The manifest permission is `network.events` only. There is no Node process.

```bash
npx open77-ts build examples/hello_world
npx open77-ts validate examples/hello_world
```

Install `examples/hello_world/ui` before a WebUI build. `npm test` builds this resource with the web step skipped so the Lua checks do not depend on Vite.

## player_notes

`examples/player_notes` is the full path.

```text
examples/player_notes/
├── src/client/index.ts
├── src/server/index.ts
├── src/backend/index.ts
├── src/webui/
├── src/shared/contracts.ts
├── dist/
├── web/
├── open77.lua
└── open77-ts.json
```

1. The player opens the React page. `createPage` uses `Open77.webui.create`. On resource stop the page is destroyed.
2. The page emits `notes:submit`.
3. Client Lua checks `isNoteRequest` and emits `notes:save`. The payload is only the text.
4. Server Lua checks `authenticatedPlayer()` and the text again.
5. Server Lua signs `notes.save` with `playerId` set from `source` and posts it with `Open77.http.request`.
6. Node validates the body with Zod and the shared text check, then inserts a note. The default store is memory. MySQL, PostgreSQL, and Redis are selected with `OPEN77_NOTES_DRIVER`.
7. Node returns the row.
8. Server Lua does not grant items, money, or vehicles. It forwards the saved text to that player.
9. Client Lua checks the result and calls `page:send`.
10. React renders the text, or "The companion process is not running." when the error is `backend_offline`.

`serveBackend()` also registers `notes.ping` for `callGame`. If the inbound listener is off, that registration prints the reason and the save path still works.

```bash
npm install --prefix examples/player_notes/src/webui
node examples/player_notes/src/webui/node_modules/esbuild/install.js
$env:OPEN77_BRIDGE_SECRET = "replace-with-16-or-more-chars"
npx open77-ts build examples/player_notes
npx open77-ts dev examples/player_notes
```

Set the same secret on the game server as `open77_bridge_secret`, and allow host `127.0.0.1` for outbound HTTP. Then `reload player_notes` from the server console.

A timed-out or refused HTTP call becomes `timeout` or the host reason. One idempotent retry uses the same request id. A second success does not insert another row.

## Templates

`templates/basic`, `templates/gameplay`, `templates/webui`, and `templates/fullstack` are what `open77-ts create` copies. `fullstack` matches the notes layout with `__RESOURCE__` as the name. Prefer `create` over copying `examples/player_notes`, so the resource name and the directory name match.
