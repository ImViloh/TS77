# Bridge

The game server and the Node process share a JSON envelope and an HMAC. The transport is HTTP. OPEN//77 build 2.50.0+op77.148 does not document a Lua WebSocket client, so the Lua side does not open one.

## Who calls whom

| Direction | Native or client | Permission | Limit |
|---|---|---|---|
| Game server to Node | `Open77.http.request` | `http.request` plus `http.allowedHosts` | Body 256 KiB, 32 headers, callback `(status, body, headers, err)`. Status `0` means the exchange did not finish. |
| Node to game server | `fetch` to the route from `Open77.http.listen` | `http.serve` plus `httpHandlers.enabled` | Body 16 KiB, 16 in flight per resource. |
| Page to Node | `fetch` `GET /health` only in the example | none | CORS allows GET from the Vite origin. |
| Page to game | `Open77.emit` then a net event | `network.events` | 48 KiB JSON. |

`Open77.http.request` returns immediately with `true`, or `false` and a reason such as `host_not_allowed`, `permission_denied:http.request`, `http_unavailable`, `body_too_large`, or `too_many_requests`. A refused call still invokes the callback. The SDK uses one `settled` flag so the script completes once.

## Envelope

```json
{
  "resource": "player_notes",
  "id": "1710000000000-1",
  "method": "notes.save",
  "timestamp": 1710000000000,
  "nonce": "1710000000000-48211",
  "signature": "<64 lowercase hex chars>",
  "payload": { "playerId": 4, "text": "Night City" }
}
```

| Field | Rule |
|---|---|
| `resource` | 1–64 characters. `GetCurrentResourceName()` on the way out. |
| `id` | 8–80 characters. Retries reuse it. |
| `method` | 1–64 characters. |
| `timestamp` | Unix milliseconds. Must be an integer within 30 seconds of the receiver's clock. |
| `nonce` | 8–80 characters. A repeat inside the receiver's window is `unauthorized`. |
| `signature` | HMAC-SHA256, lowercase hex, of the material string. |
| `payload` | Any JSON value the method's validator accepts. Missing means `null`. |

The material, with no spaces added, is:

```text
resource + "\n" + id + "\n" + method + "\n" + timestamp + "\n" + nonce + "\n" + canonical(payload)
```

The signature covers that string, not the raw HTTP bytes. The host may reorder keys when it JSON-encodes a Lua table. Both sides hash `canonical(payload)` after parsing, so key order on the wire does not matter.

## Canonical JSON

`canonical` emits objects with sorted keys, no extra spaces, and quoted strings. Integers have no decimal point. Non-finite numbers become `null`.

Lua tables cannot show the difference between `{}` and `[]`, and the TypeScriptToLua array test treats every empty table as an array. The codec therefore signs both an empty object and an empty array as `{}`. A non-empty dense list with no named fields is signed as an array (`[1,"a"]`). A table that has any named field is an object, even if it also has a numeric slot. That keeps `notes.save` payloads stable and makes `bridge.disconnect`'s empty payload verify.

The hash is a SHA-256 written with arithmetic, not `crypto`, so the same TypeScript compiles into the server bundle. Node checks it against `crypto.createHmac` in the tests. The client bundle does not include this code.

## Lua API

```ts
import { callNode, onBackendCall, serveBackend } from "@open77-ts/server/bridge";

onBackendCall("notes.ping", () => ({ pong: true }));
serveBackend();

callNode("notes.save", { playerId: player, text }, (result, failure) => {
    if (failure !== undefined) {
        emitClient(player, "notes:result", { ok: false, error: failure });
        return;
    }
}, true);
```

`callNode(method, payload, callback, idempotent?)` reads the secret and the URL, signs an envelope, and calls `Open77.http.request`. The callback runs on the resource tick.

| `failure` | When |
|---|---|
| `bridge_secret_missing` | Convar and tunable are empty. No HTTP call is made. |
| `request_refused` | `Open77.http.request` returned false and no reason string. The reason string is passed through when the host sent one (`host_not_allowed`, and the others). |
| `backend_offline` | Callback status is `0` or not a number, after the optional retry. |
| `timeout` | 5 seconds, after the optional retry. |
| `bad_response` | Body was not a JSON object. |
| `resource_stopped` | This resource stopped before the callback was delivered. |
| a string from Node | `invalid_payload`, `unauthorized`, `unknown_method`, `rate_limited`, and the other handler errors. |

The fourth argument asks for one retry. The retry uses the same request id, a new nonce, and a new signature. Node returns the stored result for an idempotent method instead of writing a second row. Methods marked idempotent are `notes.save`, `files.read`, `bridge.disconnect`, `notes.ping`, and `webhook.receive`.

If the body arrives as a string, and that string is itself a JSON object or array, it is decoded once more. That covers a host that JSON-encodes an already encoded body.

## Inbound route

`serveBackend` calls `Open77.http.listen("/bridge", handler)`. The public path is `/<resource>/bridge`. The handler:

1. Requires `POST`, otherwise `405`.
2. Requires a secret, otherwise `401 bridge_secret_missing`.
3. Decodes JSON, otherwise `400 invalid_envelope`.
4. Checks the timestamp, signature, and nonce, otherwise `401 unauthorized`.
5. Allows 30 requests per 10 seconds for the resource, otherwise `429`.
6. Dispatches `onBackendCall` handlers. Unknown methods are `404`. A thrown handler is `500 handler_error`.

`res.json(status, body)` is a dot call, matching the Devkit's serving example. Routes disappear when the resource stops. `Open77.http.unlisten` is not required.

## Clocks

The server reads `Open77.time.unix()` because the sandbox has no `os` library. Node uses `Date.now()`. Both are unix milliseconds. Skew larger than 30 seconds is rejected.
