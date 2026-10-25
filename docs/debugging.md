# Debugging

## Type errors

`open77-ts build` prints TypeScript diagnostics with the file and line. A banned pattern such as `async` or `import "fs"` names the gameplay file and the reason. The Lua is not written when that check fails.

A Node entry that imports `@open77-ts/client` fails before `tsc` runs, with `Node companion cannot import`. A page file under `src/webui/src` that imports `fs` fails with `WebUI cannot import`.

## Lua that does not parse

`validate` parses each bundle with luaparse. `open77_validate` from the Devkit compiles them with the server's own Lua when the server is installed. The notes resource has been compiled that way against binary 2.50.0+op77.156. That check is static. It does not start a session.

The manifest is not Lua. Do not run it through a Lua parser.

## Source maps

Bundles carry a map next to the `.lua` file on the machine that built them. Maps are not `web_file` or `file` entries.

```bash
npx open77-ts map examples/hello_world/dist/server/main.lua 120
```

When a position exists, the output is:

```text
[OPEN77-TS] Resource: hello_world

Runtime Error:
src/shared/greeting.ts:2
```

Paths inside `packages/sdk/src` and `packages/shared/src` stay in that form. A bare filename is searched under the resource `src/` tree. Column 0 is often empty in the map, so several columns are tried.

The sandbox has no `debug` library. The server log will not print TypeScript frames. Keep the map on the developer machine and run `map` against the line number from the log.

The bundle header is a comment:

```text
-- [OPEN77-TS] resource=player_notes runtime=server entry=src/server/index.ts
```

The global `require` fallback is replaced with a nil local and a branch that always errors, with the same number of lines, so the map stays aligned.

## doctor

```bash
npx open77-ts doctor examples/player_notes
```

Use this when a build fails before it reaches your code: missing catalogue, old Node, directory name different from `name`, missing entry file.

## Companion logs

The example writes `companion listening on http://127.0.0.1:11782` to stdout. A bad secret writes the error and sets a non-zero exit code. Watch mode prints `Node companion exited` when the process stops, including when the watcher killed it for a rebuild.

If the game reports `host_not_allowed`, `http.enabled` is false or `127.0.0.1` is missing from `allowedHosts`. If it reports `http_handlers_unavailable`, the inbound listener is off. Outbound notes still work without that listener. If the page shows the offline sentence, the server got `backend_offline`: nothing accepted the TCP connection, or the status was 0.

## Tests

```bash
npm test
```

The suite covers catalogue separation, network-value checks, the hello-world bundle, banned syntax, doctor, SHA-256 against Node's crypto, the signed note flow, replay, idempotency, file paths, SQL and Redis adapters, an offline `callGame`, a local HTTP stand-in for the game listener, and the player_notes compile. It does not join Cyberpunk 2077.
