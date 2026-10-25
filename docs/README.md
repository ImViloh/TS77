# TS77 documentation

The published guide is [index.html](index.html), also served at [imviloh.github.io/TS77](https://imviloh.github.io/TS77/).

The catalogue this tree was generated from is **2.50.0+op77.148**. Natives, permissions, and reserved event names come from that index. They are not invented.

| Guide | What it covers |
|---|---|
| [Guides](guide/README.md) | Short path from install to deploy |
| [Native index](api/natives.md) | Every native declared for this catalogue |
| [Install](install.md) | Node, the Devkit index, npm scripts, the UI toolchain |
| [Commands](commands.md) | Every `open77-ts` command and flag |
| [Configuration](configuration.md) | `open77-ts.json`, targets, convars, server.jsonc |
| [Gameplay](gameplay.md) | Client and server TypeScript, the Lua sandbox, events |
| [WebUI](webui.md) | React, Vite, `window.Open77`, page lifecycle |
| [Companion](companion.md) | The Node process, drivers, files, jobs |
| [Bridge](bridge.md) | The signed HTTP protocol between the server and Node |
| [Endpoints](endpoints.md) | Every HTTP and WebSocket route, status, and payload |
| [Security](security.md) | Secret handling, authority, CORS, path checks |
| [Manifests](manifests.md) | `open77.lua`, permissions, files, web files |
| [Debugging](debugging.md) | Type errors, source maps, doctor, validate |
| [Examples](examples.md) | `hello_world` and `player_notes`, end to end |
| [Limitations](limitations.md) | What the sandbox and this toolchain do not do |

Plugin authors should start at the [published guide](https://imviloh.github.io/TS77/). [Install](install.md) also covers building this repository. [Commands](commands.md) lists every flag. The player-notes walkthrough is in [Examples](examples.md).
