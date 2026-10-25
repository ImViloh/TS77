# Your first plugin

`ts77 create` asks for a name, a template, an optional server directory, and whether to install dependencies. In a script or in CI, pass the answers as flags so it does not wait for input:

```bash
npx ts77 create my_plugin --template gameplay --no-install
```

The name has to match the folder: a lowercase letter, then letters, digits, or underscores, 3 to 64 characters. `my-plugin` is rejected because of the hyphen. `my_plugin` is accepted.

Templates:

| Template | What you get |
|---|---|
| `basic` | One client file and one server file. No network permission. |
| `gameplay` | A typed client-to-server ping. |
| `webui` | A React page plus the client Lua that opens it. |
| `fullstack` | Gameplay, React, and a Node companion. |

Edit `src/client/main.ts` and `src/server/main.ts`. Save the file. `npm run dev` rebuilds. You do not edit the generated Lua.

If `create` finds `server.jsonc` in the current directory, a parent directory, `OPEN77_SERVER`, or a folder next to the toolchain, the wizard offers that server. Declining leaves deployment unset.
