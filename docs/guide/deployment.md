# Deployment

`ts77 deploy` builds the plugin, then copies `open77.lua`, `dist`, `web`, `modules`, and `files` into `<server>/resources/<plugin-name>`.

```bash
npx ts77 deploy --server D:\open77-server
```

The server directory is the folder that contains `server.jsonc`. The resources directory is the `resources` folder inside it. The path is saved in `open77-ts.json` as `serverResourcesDir`.

If that field is missing, deploy stops and tells you. It does not guess a server and it does not copy the resource somewhere else.

After a successful copy, restart the resource on the OPEN//77 server. TS77 does not call a reload API. A live reload was not available as a verified command in this toolchain.

The copy does not include `node_modules`, `src`, or `.env`. The Node companion is a separate process. Start it with `npm run dev` on the machine that should run it, with `OPEN77_BRIDGE_SECRET` set in that environment.
