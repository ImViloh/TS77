# Contributing

## New OPEN//77 natives

Do not hand-edit `packages/types/generated`. Run the Devkit so the index exists, then `npm run generate`. The generator reads `cards.json` for the newest indexed build at or below the server. A card with no `since` build, or a newer `since` build, stays out of the declarations and is listed in `docs/api/omitted.md`.

## CLI commands

Add the command in `packages/cli/src/cli.ts`, document it in `docs/commands.md`, and cover a success path and a failure path in `tests/cli.test.cjs`. Commands that watch the filesystem must stop their child processes on SIGINT.

## Templates

Keep `basic` free of network permissions and of a Node backend. Put npm packages in `src/backend` only. Client Lua modules go in `src/modules` and are published with `file`.

## Releases

See `RELEASE.md`. Do not publish unless `npm whoami` succeeds and `npm test` has passed on the packed tarball.
