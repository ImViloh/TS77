# Limitations

This toolchain targets the OPEN//77 catalogue it was generated from. In this workspace that catalogue is **2.50.0+op77.148**. The VOSS server binary can be newer. A native that exists only in a later build is not declared, and a native removed from the catalogue is not invented.

## Runtime

The dedicated server sandbox has no `require`, `debug`, `os`, `io`, `package`, `load`, or `collectgarbage`. The client also removes `setmetatable` and `getmetatable`. Bundles therefore use a local module table, inline the small TypeScriptToLua helpers, and reject `class` because classes compile to `setmetatable`.

`debug.traceback` and TypeScriptToLua's `sourceMapTraceback` are not enabled. Source maps are files on the developer machine. `open77-ts map` can turn a Lua file and line into a TypeScript file and line when that map exists. The game log does not do this by itself.

JavaScript `Promise`, `async`/`await`, `Map`, `Set`, and Node.js modules are rejected. `Wait` and `CreateThread` are the scheduler. An `Open77.Promise` returned by a native is a host object with `await` and `next`; it is not a JavaScript promise.

`undefined` and `null` both become Lua `nil`. Optional native results are a value plus, when the card says so, a failure reason. Read both with a destructuring assignment so TypeScriptToLua keeps the multiple Lua returns.

## Calls

Namespace functions are declared with `this: void`, so TypeScriptToLua emits `Open77.vehicles.spawn(...)`. `WebUI.Page`, `Open77.Promise`, and `Open77.EventVerdict` are instance methods and emit colon calls. Getting this backwards is a runtime failure, which is why the hello-world build is checked for both forms.

## Modules

Shared TypeScript is compiled into each side that imports it. It is not a `shared_script`. Do not put secrets in a module imported by client code: the client bundle, and every file under `modules/`, is delivered to players.

`require` in `src/backend` is Node. `loadModule` on the client is the sandbox file loader. Neither one puts `rethinkdb`, `chalk`, or `node_modules` inside the Lua VM. The server still has no `require`.

## WebUI

React and Vite compile to browser files under `web/`. They are not Lua. `window.Open77` exists only in the WebUI page. `localhost` in a dev URL is the player's computer, not the dedicated server.

## Node companion

The companion is a separate operating-system process. Gameplay scripts cannot import `fs`, `mysql2`, or `@open77-ts/node`; those imports are compile errors. The page cannot import them either.

The game server reaches the companion with `Open77.http.request`. The companion reaches the game server with HTTP `POST /<resource>/bridge`, which the server registers through `Open77.http.listen`. OPEN//77 does not document a Lua WebSocket client, so the bridge does not invent one. WebSockets on the companion are for a process that can speak the signed envelope, not for the Lua VM.

Outbound HTTP is off until `server.jsonc` sets `http.enabled` and lists the companion host in `http.allowedHosts`. That list is a hostname without a port, so `127.0.0.1` covers `http://127.0.0.1:11782`. Inbound `httpHandlers` is a separate opt-in, loopback by default, with a 16 KiB body cap. The companion refuses a secret shorter than 16 characters. The game reads that secret from the `open77_bridge_secret` convar, which also sees this resource's tunable of the same name. The default is empty. Do not put the secret in `server.jsonc` or in any file the client downloads.

A resource stop drops the listen route and ignores late callbacks. The page cannot call `notes.save`. A browser `fetch` is limited to companion routes that do not require the bridge secret, and `127.0.0.1` from the page is the player's computer.

## Signature codec

Lua has one kind of table. An empty object and an empty array are the same value, and the bundled array test treats every empty table as an array. The bridge therefore signs both as `{}`. A non-empty dense list is still a JSON array. Do not put meaning on the difference between `{}` and `[]` inside a signed payload.

Comments and string literals in the generated Lua are removed before the native scan. A native named only inside a string does not add a permission and does not fail the unknown-native check.

## What is not claimed

A successful compile and a passing `open77_validate` check do not mean a feature was exercised in Cyberpunk 2077. Join a server and run the resource before treating gameplay as verified.
