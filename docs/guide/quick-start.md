# Quick start

Install Node.js 20 or newer. The Node companion, when a plugin has one, expects Node.js 22 or newer.

From a terminal:

```bash
npx ts2077 create my_plugin --template basic --no-install
cd my_plugin
npm install
npm run dev
```

`npm run dev` watches `src/` and rebuilds Lua. This plugin has no WebUI and no Node process.

When the output is what you want:

```bash
npm run build
```

That writes `open77.lua`, `dist/client/main.lua`, and `dist/server/main.lua`.

To copy the resource onto a server you already have:

```bash
npx ts2077 deploy --server <path-to-the-server>
```

Restart that resource in OPEN//77 after the copy. TS77 does not reload the dedicated server.

Open the project folder in Cursor or VS Code. `tsconfig.json` is already there. It points the editor at the client and server projects, so `@open77/sdk/client` and natives such as `GetCurrentResourceName` resolve. The hover text comes from the generated declarations: the summary, parameters, permissions, and the catalogue version.
