# Endpoints

The companion listens on `http://127.0.0.1:11782` unless `OPEN77_BRIDGE_PORT` is set. The game listener, when enabled, is whatever `httpHandlers.listenUrl` says. The default in the server schema is `http://127.0.0.1:11781`.

Signed routes do not use a header for the HMAC. The signature is a field in the JSON body, so a proxy that rewrites headers cannot strip it, and the page cannot attach it without the secret.

## GET /health

No signature. Response `200`:

```json
{ "ok": true }
```

CORS allows this method from `http://127.0.0.1:5173` by default. It returns no player data and no secret. `POST` is not in the CORS allow list.

## POST /v1/call

The game server posts here. Body limit 16 KiB. Content type `application/json`.

Success `200`:

```json
{ "ok": true, "id": "note-id-1000", "result": { "id": "note-id-1000", "playerId": 4, "text": "Night City", "savedAt": 1710000000000 } }
```

| Status | `error` | When |
|---|---|---|
| 400 | `invalid_envelope` | Body is not an envelope, or the signature is not 64 lowercase hex characters. |
| 400 | `invalid_payload` | The method's Zod schema rejected the payload. |
| 400 | `path_rejected` | `files.read` path escapes the root. |
| 400 | `files_disabled` | `files.read` while `filesRoot` was not set. |
| 400 | `file_too_large` | File is over 16 KiB. |
| 401 | `unauthorized` | Clock skew, bad HMAC, or a replayed nonce. |
| 404 | `unknown_method` | No handler for `method`. |
| 429 | `rate_limited` | More than 30 signed calls per resource per 10 seconds. The limit is configurable. |
| 500 | other | The handler threw something that is not one of the 400 errors. |

A failed signature does not consume a rate-limit token. A replayed nonce is rejected before the handler runs. A repeated request id with a new nonce, after success, returns the cached result for idempotent methods and does not write again. The cache lives 60 seconds.

### notes.save

```json
{ "playerId": 4, "text": "Night City" }
```

`playerId` is an integer greater than or equal to 1. `text` is 1 to 96 characters. Extra fields are rejected. The row id is the envelope `id`, not a field of the payload. The game server must set `playerId` from `authenticatedPlayer()`.

### files.read

```json
{ "path": "kept.txt" }
```

Result `{ "text": "..." }`. The path is relative to `filesRoot`.

### bridge.disconnect

Payload `{}`. Result `{ "cleared": true }`. The Lua bridge sends this when the resource stops, then ignores the callback because the generation has already moved on. It tells Node the resource is going away. Current handlers do not drop in-memory notes. The call is still authenticated.

### notes.ping

Payload `{}`. Result `{ "pong": true }`. This is the liveness method `callGame` uses. It does not change player state.

### webhook.receive

Any JSON payload. Result `{ "accepted": true, "payload": <the same value> }`. This is how an operator who already has the bridge secret posts an event. It is not an open Discord-style webhook. A third party that does not know the secret gets `401`.

## POST /v1/webhook

Same parser, same signature, same methods as `/v1/call`. The separate path exists so an operator can point a signed caller at a webhook URL without using the game-server path. Unsigned callers are rejected.

## WebSocket /v1/events

The first message must be a signed envelope with `method` equal to `bridge.hello`. A bad first message closes the socket with code `4001`. A good one replies:

```json
{ "ok": true, "result": { "ready": true } }
```

Later messages may be `{ "type": "ping" }`, which replies `{ "type": "pong" }`. The page in the example does not open this socket. The Lua VM cannot. A browser still cannot complete the handshake without the secret.

## POST /<resource>/bridge

Served by the game, not by Fastify. For `player_notes` the URL is:

```text
http://127.0.0.1:11781/player_notes/bridge
```

The body is the same envelope. Only methods registered with `onBackendCall` exist. The example registers `notes.ping`.

| Status | Body |
|---|---|
| 405 | `{ "ok": false, "error": "method_not_allowed" }` |
| 401 | `bridge_secret_missing` or `unauthorized` |
| 400 | `invalid_envelope` |
| 429 | `rate_limited` |
| 404 | `unknown_method` |
| 500 | `handler_error` |
| 200 | `{ "ok": true, "id": "...", "result": ... }` |

If `httpHandlers` is disabled, `serveBackend` prints `http_handlers_unavailable` and the outbound path to Node still works.

## Game events in the notes example

These are OPEN//77 net events and page messages, not HTTP.

| Name | From | To | Body |
|---|---|---|---|
| `notes:submit` | Page `emit` | Client Lua | `{ "text": "..." }` |
| `notes:save` | Client `TriggerServerEvent` | Server Lua | `{ "text": "..." }` |
| `notes:result` | Server `TriggerClientEvent` | Client Lua, then `page:send` | `{ "ok": true, "note": { "text": "..." } }` or `{ "ok": false, "error": "backend_offline" }` |
| `notes:state` | Client `page:send` | Page | `{ "text": "..." }` |
| `ui:ready` | Page `ready()` | Client Lua | none |

The client checks `isNoteRequest` before it sends. The server checks it again and substitutes the real player id. The page renders `backend_offline` as "The companion process is not running."
