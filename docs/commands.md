# Commands

The public executable is `ts77`. `open77-ts` runs the same file. The npm package name is `ts2077`.

| Command | What it does |
|---|---|
| `ts77 create` | Writes a plugin. In a terminal with no name, it asks four questions. `--no-install` skips `npm install`. |
| `ts77 init` | Adds the basic template to a directory and skips files that already exist. |
| `ts77 dev` | Watches `src`, rebuilds, restarts a Node companion only when `dist/backend` exists, and starts Vite only when its dependencies are installed. |
| `ts77 build` | Compiles the plugin. |
| `ts77 watch` | Rebuilds on change and does not start Vite. |
| `ts77 deploy` | Builds and copies the resource. Refuses to run until a server resources directory is set. |
| `ts77 validate` | Checks the manifest and the Lua bundles. |
| `ts77 doctor` | Reports Node, TypeScriptToLua, the catalogue, and the plugin layout. |
| `ts77 types` | Regenerates declarations from the local Devkit index. |
| `ts77 docs` | Prints the path of `docs/index.html`. `--open` opens it. |
| `ts77 update` | Prints the catalogue build and the command that refreshes the Devkit index. It does not download or publish. |
| `ts77 help` | Prints the command list and examples. |

`ts77 --version` prints the package version. `--quiet` hides the success banner.

The sections below describe the same build in more detail.

The CLI is `npx ts2077` from the registry, or `npx open77-ts` from this repository. Every command except `types` and `map` takes an optional resource directory. The default is the current directory.

```text
open77-ts <command>

  init [dir]
  create <name> [--template basic|gameplay|webui|fullstack] [--out dir]
  build [dir] [--dev] [--deploy]
  watch [dir]
  dev [dir]
  validate [dir]
  doctor [dir]
  map <lua-file> <line> [column]
  types
```

## init

`init` copies the `basic` template into an existing directory. The directory's basename becomes the resource name and must already be a legal slug. If `open77-ts.json` is already there, the command leaves the directory alone.

## create

```bash
npx ts2077 create my_resource --template basic
npx ts2077 create my_job --template gameplay
npx ts2077 create my_hud --template webui
npx ts2077 create my_notes --template fullstack --out E:\CODING\VOSS\resources\my_notes
```

The destination folder name must equal `<name>`. `--out` sets that folder. Without `--out`, the folder is created in the current directory.

| Template | Layout |
|---|---|
| `basic` | Client and server scripts that print on start. No network permission. |
| `gameplay` | A typed ping from client to server and back. |
| `webui` | Gameplay plus a React HUD in `ui/`. |
| `fullstack` | `src/client`, `src/server`, `src/backend`, `src/webui`, and `src/shared`. |

`__RESOURCE__` in a template is replaced with the resource name. `fullstack` still needs `npm install` inside `src/webui` before the page will build, and `OPEN77_BRIDGE_SECRET` before the companion will listen.

## build

```bash
npx open77-ts build examples/player_notes
npx open77-ts build examples/hello_world --dev
npx open77-ts build examples/hello_world --deploy
```

For each selected target the build:

1. Writes `src/generated/flags.ts` with the WebUI entry. `--dev` uses `web.devEntry` when it is set, so the page can load Vite on the player's machine.
2. Writes `tsconfig.json`, `tsconfig.client.json`, and `tsconfig.server.json` with paths to the SDK and the generated declarations. The editor reads `tsconfig.json`.
3. Rejects classes, async, Node imports, and SDK imports from the wrong runtime.
4. Compiles client and server TypeScript to one Lua 5.4 bundle each, inlines the small TypeScriptToLua helpers, and removes the global `require` fallback. TypeScript under `src/modules` is compiled to `modules/*.lua` and listed as `file` entries for the client sandbox loader. `src/backend` is compiled with `tsc` so `require` and `import` of npm packages stay in Node.
5. Scans the Lua for natives, refuses unknown or wrong-side calls, and records permissions.
6. Compiles `src/backend` to `dist/backend/index.js` when the `node` target is on.
7. Runs Vite when the `webui` target is on and `--` the WebUI dependencies are installed. A resource that lists `webui` explicitly fails the build if Vite fails. A resource that only has a `web.root` and does not list targets keeps going and prints the Vite error.
8. Writes `open77.lua`. Scripts that were not built are omitted. `files/` and `web/` are listed file by file. Source maps are not listed.

`--deploy` copies `open77.lua`, `dist`, and `web` into `<serverResourcesDir>/<resource name>`. It does not reload the server and it does not start Node. `dist/backend` is part of `dist`, so the JavaScript is copied, but the dedicated server does not execute it.

## watch

`watch` rebuilds when anything under `src/` changes. If `dist/backend/index.js` exists after a successful build, the previous companion process is killed and a new one is started with the current environment. The secret has to already be in that environment.

## dev

`dev` is `watch` plus Vite. It looks for `node_modules/vite/bin/vite.js` in `ui/` and then in `src/webui/`. The dev server binds `127.0.0.1:5173`. That address is the computer running Vite. In a real session that is the player's PC, not the dedicated server.

## validate

`validate` checks that every `client_script`, `server_script`, `file`, and `web_file` in `open77.lua` exists, that both Lua bundles parse, that the bundle does not fall back to the global `require`, and that the native scan still matches the catalogue. It does not typecheck TypeScript. Run `build` first.

## doctor

`doctor` prints `ok`, `warn`, or `fail` lines:

- Node version
- `typescript-to-lua` installed
- Catalogue present, with its build and counts
- A warning that the server binary may be newer than the catalogue
- Resource name, directory name, client entry, server entry, backend entry, and target list
- `serverResourcesDir` when it is set

Exit code 1 means at least one `fail` line.

## map

```bash
npx open77-ts map examples/hello_world/dist/server/main.lua 120
npx open77-ts map examples/hello_world/dist/server/main.lua 120 4
```

Reads the `.map` beside the Lua file and prints a TypeScript file and line. Column 0 often has no mapping, so the tool also tries columns 0, 1, 2, 4, 8, and 16. The game cannot do this. `debug.traceback` is not in the sandbox, and `sourceMapTraceback` is off.

## types

Regenerates declarations from the Devkit index. Same as `npm run generate`.

## What the CLI does not do

It does not join a server, send `reload`, or open Cyberpunk 2077. Reloading a resource is a console command on that server.
