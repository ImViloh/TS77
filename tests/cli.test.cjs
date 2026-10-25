const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const cli = path.join(root, "packages/cli/dist/cli.js");

test("help, version, docs, and update answer without a project", () => {
    const help = spawnSync(process.execPath, [cli, "help"], { encoding: "utf8" });
    assert.equal(help.status, 0);
    assert.match(help.stdout, /deploy/);
    assert.match(help.stdout, /create my_plugin/);
    const version = spawnSync(process.execPath, [cli, "--version"], { encoding: "utf8" });
    assert.equal(version.status, 0);
    assert.match(version.stdout, /^\d+\.\d+\.\d+\s*$/);
    const docs = spawnSync(process.execPath, [cli, "docs"], { encoding: "utf8" });
    assert.equal(docs.status, 0);
    assert.match(docs.stdout, /index\.html/);
    const update = spawnSync(process.execPath, [cli, "update"], { encoding: "utf8" });
    assert.equal(update.status, 0);
    assert.match(update.stdout, /2\.50\.0\+op77\.148/);
    const bad = spawnSync(process.execPath, [cli, "create", "My Plugin", "--no-install"], { encoding: "utf8" });
    assert.equal(bad.status, 1);
    assert.match(bad.stderr, /not a valid plugin name/);
});

test("create writes npm scripts and deploy waits for a server directory", () => {
    const dir = path.join(root, "spike", "cli_plugin");
    fs.rmSync(dir, { recursive: true, force: true });
    const created = spawnSync(process.execPath, [cli, "create", "cli_plugin", "--template", "basic", "--out", dir, "--no-install"], { encoding: "utf8" });
    assert.equal(created.status, 0, created.stderr);
    assert.match(created.stdout, /npm run dev/);
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
    assert.equal(pkg.scripts.dev, "ts77 dev");
    assert.equal(pkg.scripts.build, "ts77 build");
    const again = spawnSync(process.execPath, [cli, "create", "cli_plugin", "--template", "basic", "--out", dir, "--no-install"], { encoding: "utf8" });
    assert.equal(again.status, 1);
    assert.match(again.stderr, /already has files/);
    const deploy = spawnSync(process.execPath, [cli, "deploy", dir], { encoding: "utf8" });
    assert.equal(deploy.status, 1);
    assert.match(deploy.stderr, /not configured/);
    fs.writeFileSync(path.join(dir, "ts77.config.json"), JSON.stringify({ version: "9.9.9" }));
    const { loadConfig } = require("../packages/compiler/dist/index.js");
    assert.equal(loadConfig(dir).version, "9.9.9");
    assert.equal(loadConfig(dir).name, "cli_plugin");
});
