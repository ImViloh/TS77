# __RESOURCE__

Gameplay, a React WebUI, and an optional Node companion. The companion starts only because this template has a backend entry. A basic plugin does not start Node.

```bash
npm install
npm install --prefix src/webui
```

Set `OPEN77_BRIDGE_SECRET` to 16 or more characters before `npm run dev` if you want the companion to stay running. The game reads the same secret from the `open77_bridge_secret` convar or tunable. Do not put that secret in client TypeScript or in the React page.

`npm run build` produces the Lua bundles, the web files, and `dist/backend`.
