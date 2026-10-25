const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ui = path.resolve(__dirname, "..", "examples", "player_notes", "src", "webui");
const vite = path.join(ui, "node_modules", "vite", "bin", "vite.js");
const esbuild = path.join(ui, "node_modules", "esbuild", "bin", "esbuild");

function run(command, args) {
    const result = spawnSync(command, args, {
        cwd: ui,
        stdio: "inherit",
        shell: process.platform === "win32",
    });
    if (result.error) {
        process.stderr.write(`${result.error.message}\n`);
        process.exit(1);
    }
    if (result.status !== 0) process.exit(result.status ?? 1);
}

if (!fs.existsSync(vite)) {
    run("npm", ["ci"]);
}

if (!fs.existsSync(esbuild)) {
    run(process.execPath, [path.join(ui, "node_modules", "esbuild", "install.js")]);
}
