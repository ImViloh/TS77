# Changelog

## 1.0.0

First package prepared for the npm name `ts77`.

- Public CLI commands: `create`, `init`, `dev`, `build`, `watch`, `deploy`, `validate`, `doctor`, `types`, `docs`, `update`, `help`.
- New plugins get `package.json` scripts for `dev`, `build`, `deploy`, and `validate`.
- Optional `ts77.config.json` and `ts77.config.ts` overlay the resource config without replacing `open77-ts.json` on disk.
- TypeScript declarations stay generated from the OPEN//77 Devkit catalogue. This release's catalogue is 2.50.0+op77.148.
- `ts77 types` keeps the last generated declarations when the Devkit index is not on the machine, and says so.
