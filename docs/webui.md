# WebUI

OPEN//77 draws resource pages with its own Chromium Embedded Framework surface. This toolchain does not launch a second browser. Production pages are files under `web/`. Development pages are a Vite URL.

## Page bridge

Inside the surface the host provides `window.Open77`:

```ts
interface Open77PageBridge {
    on(event: string, handler: (payload: unknown) => void): void;
    emit(event: string, payload?: unknown): void;
    invoke(event: string, payload?: unknown): Promise<unknown>;
    ready(): void;
}
```

`@open77-ts/webui` wraps those four functions.

| Wrapper | Behavior |
|---|---|
| `pageBridge()` | Returns `window.Open77` or throws if the page is not inside a surface. |
| `onPage(event, handler)` | `Open77.on` |
| `emitPage(event, payload)` | `Open77.emit`, after checking the JSON size |
| `readyPage()` | `Open77.ready` |
| `backendHealth(url)` | `GET` that URL. It does not send the bridge secret. |

`WEBUI_MESSAGE_MAX_BYTES` is 2 MiB, the documented WebUI message ceiling. A game event that carries the same data is still limited to 48 KiB. Keep page messages inside the smaller limit when they will be forwarded to the server.

The first `page:send` before the page calls `ready()` is dropped by the host. Call `readyPage()` after subscribing, and call it again after a Vite reload.

## Lua side

```ts
const page = createPage({
    entry: webuiEntry,
    layer: "hud",
    transparent: true,
    visible: true,
});
if (page === undefined) return;
page.on("ui:ready", () => {
    page.send("notes:state", { text: "ready" });
});
page.on("notes:submit", (payload) => {
    // validate, then emitServer
});
```

`page:on`, `page:send`, `page:reply`, and `page:destroy` are colon calls. `page.send` returns false when the page did not accept the message.

`webuiEntry` comes from `src/generated/flags.ts`. A normal build sets it to `web.entry` (`web/index.html`). `open77-ts build --dev` sets it to `web.devEntry` (`http://127.0.0.1:5173/`).

## Vite

`web.root` is either `ui/` (the `webui` template) or `src/webui` (the `fullstack` template). The Vite config used by the examples sets:

- `base: "./"` so the packaged page can load relative assets
- `build.outDir` pointing at the resource `web/` directory
- `build.emptyOutDir: true`
- `build.sourcemap: false` so maps are not shipped to players
- `server.host: "127.0.0.1"` and port `5173`

The manifest lists every file under `web/` except `.map` files, one `web_file` each. Globs are not used, because an empty glob is illegal and `**` does not match a file that sits directly in `web/`.

The page's own TypeScript is not part of the Lua program. The build scans `src/` under the WebUI root and rejects Node imports and SDK imports. `vite.config.ts` may import `node:path`. That file is the bundler config, not the page.

## Talking to Node from the page

`backendHealth` may `GET` a companion URL. The notes page calls `http://127.0.0.1:11782/health`. CORS on the companion allows `GET` from `http://127.0.0.1:5173` and does not allow the browser to `POST /v1/call`.

In a dedicated-server session, `127.0.0.1` inside the page is the player's computer. The companion is usually on the server machine. The health check is a local-dev signal. Saving a note goes through client Lua and the game server, which is the machine that can reach the companion.

The page has no filesystem access and cannot start a process. Do not put `OPEN77_BRIDGE_SECRET` in the page bundle.
