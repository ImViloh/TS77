# Release

The npm package name is `ts2077`. The unscoped name `ts77` is rejected because it is too similar to existing packages. Version 1.0.0 is the first registry release. Later versions publish from this repository with an authorized npm account.

1. `npm test`
2. `node scripts/check-docs.cjs`
3. `npm pack --dry-run` and read the file list. It must include `packages/cli/dist`, `packages/compiler/dist`, `packages/types/generated`, `packages/sdk/src`, `templates`, and `docs`. It must not include `node_modules` or `spike`.
4. Install the tarball in an empty directory and run `npx ts2077 create`, `npx ts2077 build`, and `npx ts2077 validate` on a basic plugin.
5. `npm login`
6. `npm publish --access public`

`npm publish` runs `prepublishOnly`, which runs the test suite. There is no npm token in this repository. The registry requires a one-time two-factor code (`npm publish --access public --otp=123456`) or a granular access token with bypass 2FA enabled. Provenance requires a GitHub Actions trusted publisher.
