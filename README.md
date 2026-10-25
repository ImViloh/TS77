# TS77

Write OPEN//77 plugins in TypeScript. TS77 compiles the client and the server to Lua 5.4, writes the `open77.lua` manifest, and can build a React page and an optional Node companion.

The game runs the Lua. It does not run TypeScript. A web page cannot call natives. The server decides anything a player can gain.

The full guide is at [imviloh.github.io/TS77](https://imviloh.github.io/TS77/).

## Create a plugin

You need Node.js 20 or newer. A plugin with a Node companion needs Node.js 22 for that process.

```bash
npx ts2077 create my_plugin --template basic --no-install
cd my_plugin
npm install
npm run dev
```

The npm package is `ts2077`. It installs the `ts77` and `open77-ts` commands. `npm run dev` watches `src/` and rebuilds Lua when you save.

Open the folder in your editor. `tsconfig.json` is already there, so `@open77/sdk/client` and the native declarations resolve.

The folder name is the resource name: a lowercase letter, then letters, digits, or underscores, 3 to 64 characters. `my_plugin` is valid. `my-plugin` is not.

| Template | What you get |
|---|---|
| `basic` | A client and a server that print a greeting. No network permission. |
| `gameplay` | One typed event from the client to the server and back. |
| `webui` | Gameplay plus a React page in `ui/`. |
| `fullstack` | Gameplay, a React page, and a Node companion. |

```bash
npx ts2077 create my_job --template gameplay
npx ts2077 create my_hud --template webui
npx ts2077 create my_notes --template fullstack
```

## Commands

Inside the plugin, `package.json` already has these scripts:

```bash
npm run dev
npm run build
npm run deploy
npm run validate
```

The same actions from any directory:

```bash
npx ts2077 build my_plugin
npx ts2077 watch my_plugin
npx ts2077 validate my_plugin
npx ts2077 doctor my_plugin
```

`build` writes `open77.lua`, `dist/client/main.lua`, and `dist/server/main.lua`. Leave those files alone. Change the TypeScript and build again.

## Gameplay

Client code is `src/client`. Server code is `src/server`. Code imported by both is `src/shared`.

```ts
import { onClientResourceStart } from "@open77/sdk/client";
import { greet } from "../shared/greeting";

onClientResourceStart(() => {
    print(greet(GetCurrentResourceName()));
});
```

```ts
import { authenticatedPlayer, emitClient, onNet } from "@open77/sdk/server";

onNet("demo:ping", (payload) => {
    const player = authenticatedPlayer();
    if (player === undefined) return;
    emitClient(player, "demo:pong", payload);
});
```

`authenticatedPlayer()` is the server-assigned player. A client cannot choose that id. Check the payload before you use it.

Natives come from the OPEN//77 catalogue shipped with this package, **2.50.0+op77.148**. A client file cannot call `TriggerClientEvent`. A server file cannot call `TriggerServerEvent`. `class`, `async`, and Node.js imports are compile errors in gameplay.

## Deploy

```bash
npx ts2077 deploy --server <server-directory>
```

`<server-directory>` is the folder that contains `server.jsonc`. TS77 copies the built resource into `resources/<plugin>` inside it. Restart that resource on the server afterward. TS77 does not reload the server.

## React and Node

A `webui` plugin keeps its page in `ui/`. Run `npm install` there before the first page build. The page uses `window.Open77` only: `ready`, `on`, `emit`, and `invoke`.

A `fullstack` plugin adds `src/backend`. Set `OPEN77_BRIDGE_SECRET` to the same value on Node and on the game server before the companion will accept a call. Databases and other npm packages belong in that process, not in Lua.

Details, the native index, and the companion protocol are in the [guide](https://imviloh.github.io/TS77/).
