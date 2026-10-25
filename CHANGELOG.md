# Changelog

## 1.0.2

- The README and the guide are written for people installing the package.
- Published files no longer include a path from the machine that generated them.

## 1.0.1

- `create`, `init`, and `build` write `tsconfig.json`. The editor reads that file and then the client or server project, so `@open77/sdk/client` and the native declarations resolve.
- The npm package name is `ts2077`. The installed commands remain `ts77` and `open77-ts`.

## 1.0.0

First package prepared for the npm name `ts2077`. The installed commands are `ts77` and `open77-ts`.

- Public CLI commands: `create`, `init`, `dev`, `build`, `watch`, `deploy`, `validate`, `doctor`, `types`, `docs`, `update`, `help`.
- New plugins get `package.json` scripts for `dev`, `build`, `deploy`, and `validate`.
- Optional `ts77.config.json` and `ts77.config.ts` overlay the resource config without replacing `open77-ts.json` on disk.
- TypeScript declarations stay generated from the OPEN//77 Devkit catalogue. This release's catalogue is 2.50.0+op77.148.
- `ts77 types` keeps the last generated declarations when the Devkit index is not on the machine, and says so.
