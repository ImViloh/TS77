# TypeScript and Lua

OPEN//77 runs plugins as Lua 5.4. The dedicated server does not run Node.js, and its sandbox has no global `require`. TS77 compiles client and server TypeScript into Lua so you can write TypeScript while the game still receives Lua.

You do not install TypeScriptToLua yourself, and you do not write `open77.lua` by hand. `npm run build` does both.

A React page stays JavaScript. A Node companion, if the plugin has `src/backend`, stays JavaScript. Those two are not converted to Lua.

The webpage inside the game can send messages to client Lua. It cannot call game natives on its own. Client Lua calls natives. Server Lua is the side that may change authoritative game state.
