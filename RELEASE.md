# Release

The npm package name `ts77` was not registered when this tree was prepared. Publishing needs an authorized npm account.

1. `npm test`
2. `node scripts/check-docs.cjs`
3. `npm pack --dry-run` and read the file list. It must include `packages/cli/dist`, `packages/compiler/dist`, `packages/types/generated`, `packages/sdk/src`, `templates`, and `docs`. It must not include `node_modules` or `spike`.
4. Install the tarball in an empty directory and run `npx ts77 create`, `npx ts77 build`, and `npx ts77 validate` on a basic plugin.
5. `npm login`
6. `npm publish --access public`

`npm publish` runs `prepublishOnly`, which runs the test suite. There is no npm token in this repository. Provenance requires a GitHub Actions trusted publisher, which is not configured until the repository has a public remote.

This release was not published from this workspace. `npm whoami` reported that the machine was not logged in.
