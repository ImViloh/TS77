# Project layout

```text
my_plugin/
  open77-ts.json      configuration the build reads
  package.json        npm scripts: dev, build, deploy, validate
  src/client/         TypeScript that becomes client Lua
  src/server/         TypeScript that becomes server Lua
  src/shared/         TypeScript compiled into each side that imports it
  src/modules/        optional client Lua modules, published as files
  src/backend/        optional Node companion
  src/webui/          optional React page
  dist/               generated Lua and the companion
  open77.lua          generated manifest
```

A basic plugin has `src/client` and `src/server` only. It does not start Node and it does not build a page.

`ts77.config.json` or `ts77.config.ts` can override fields such as `serverResourcesDir`. The build reads the overlay in memory. It does not rewrite `open77-ts.json` unless you pass `ts77 deploy --server`.
