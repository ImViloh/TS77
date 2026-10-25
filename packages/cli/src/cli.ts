#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, watch } from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import readline from "node:readline";

interface BuildResult {
    ok: boolean;
    messages: string[];
    permissions: string[];
}

interface DoctorLine {
    level: "ok" | "warn" | "fail";
    text: string;
}

interface MappedFrame {
    source?: string;
    line?: number;
}

interface PackageJson {
    name?: string;
    version?: string;
}

const compiler = require("../../compiler/dist/index.js") as {
    buildResource(resourceDir: string, options?: { dev?: boolean; deploy?: boolean }): BuildResult;
    writeTypeScriptProjects(resourceDir: string): void;
    validateResource(resourceDir: string): BuildResult;
    doctor(resourceDir?: string): DoctorLine[];
    mapLuaPosition(luaFile: string, line: number, column?: number): Promise<MappedFrame | undefined>;
    repoRoot(): string;
    resourceNameFromLua(luaFile: string): string;
    RESOURCE_NAME: RegExp;
    loadConfig(resourceDir: string): { serverResourcesDir?: string; name: string };
};

const TEMPLATES = path.join(compiler.repoRoot(), "templates");
const TEMPLATE_NAMES = ["basic", "gameplay", "webui", "fullstack"] as const;

function packageInfo(): PackageJson {
    return JSON.parse(readFileSync(path.join(compiler.repoRoot(), "package.json"), "utf8")) as PackageJson;
}

function usage(): void {
    const bin = path.basename(process.argv[1] ?? "ts77").replace(/\.js$/, "");
    process.stdout.write(`${bin} <command>

  create [name] [--template basic|gameplay|webui|fullstack] [--out dir] [--server dir] [--install] [--no-install] [--force]
  init [dir]                  add TypeScript files without replacing files that already exist
  dev [dir]                   watch TypeScript, restart the Node companion only when the project has one, and start Vite when a WebUI is installed
  build [dir] [--dev] [--deploy]
  watch [dir]
  deploy [dir] [--server dir] copy the built resource into the server resources directory
  validate [dir]
  doctor [dir]
  types                       regenerate declarations from the local Devkit index
  docs [--open]               print the documentation page
  update                      show the catalogue build and how to refresh it
  map <lua-file> <line> [column]
  help

Examples:
  ${bin} create my_plugin --template basic --no-install
  cd my_plugin
  npm install
  npm run dev
  npm run build
  ${bin} deploy --server D:\\\\open77-server

Node.js ${process.versions.node}. Add --quiet to shorten success output, or --verbose to repeat diagnostic text.
`);
}

function argValue(args: string[], flag: string): string | undefined {
    const index = args.indexOf(flag);
    if (index < 0 || !args[index + 1] || args[index + 1].startsWith("--")) return undefined;
    return args[index + 1];
}

function quiet(args: string[]): boolean {
    return args.includes("--quiet");
}

function copyTemplate(template: string, destination: string, name: string, skipExisting: boolean): void {
    const source = path.join(TEMPLATES, template);
    if (!existsSync(source)) throw new Error(`unknown template ${template}. Choose ${TEMPLATE_NAMES.join(", ")}.`);
    mkdirSync(destination, { recursive: true });
    copyTree(source, destination, name, skipExisting);
}

function copyTree(source: string, destination: string, name: string, skipExisting: boolean): void {
    for (const entry of readdirSync(source)) {
        const from = path.join(source, entry);
        const to = path.join(destination, entry);
        if (statSync(from).isDirectory()) {
            mkdirSync(to, { recursive: true });
            copyTree(from, to, name, skipExisting);
            continue;
        }
        if (skipExisting && existsSync(to)) continue;
        const text = readFileSync(from);
        const replaced = text.toString("utf8").split("__RESOURCE__").join(name);
        writeFileSync(to, replaced, "utf8");
    }
}

function companionEnv(dir: string): NodeJS.ProcessEnv {
    const roots = [path.join(dir, "node_modules"), path.join(compiler.repoRoot(), "node_modules")];
    if (process.env.NODE_PATH) roots.push(process.env.NODE_PATH);
    return { ...process.env, NODE_PATH: roots.join(path.delimiter) };
}

function backendScript(dir: string): string {
    const configPath = path.join(dir, "open77-ts.json");
    let backend = "src/backend/index.ts";
    if (existsSync(configPath)) {
        const config = JSON.parse(readFileSync(configPath, "utf8")) as { backend?: string };
        if (typeof config.backend === "string" && config.backend.length > 0) backend = config.backend;
    }
    const relative = backend.replace(/\\/g, "/").replace(/^src\/backend\//, "").replace(/\.tsx?$/, ".js");
    return path.join(dir, "dist", "backend", relative);
}

function projectDir(args: string[]): string {
    return path.resolve(args.find((arg) => !arg.startsWith("--")) ?? process.cwd());
}

function build(dir: string, args: string[]): number {
    const result = compiler.buildResource(dir, { dev: args.includes("--dev"), deploy: args.includes("--deploy") });
    if (!result.ok) {
        for (const message of result.messages) process.stderr.write(`${message}\n`);
        return 1;
    }
    if (!quiet(args)) {
        for (const message of result.messages) process.stdout.write(`${message}\n`);
        process.stdout.write(`built ${path.resolve(dir)}\npermissions: ${result.permissions.join(", ") || "(none)"}\n`);
    }
    return 0;
}

function resourcesDir(serverDir: string): string {
    const resolved = path.resolve(serverDir);
    if (path.basename(resolved).toLowerCase() === "resources") return resolved;
    if (!existsSync(path.join(resolved, "server.jsonc")) && !existsSync(path.join(resolved, "server.json"))) {
        process.stdout.write(`No server.jsonc in ${resolved}. Using it as the resources directory anyway.\n`);
        return resolved;
    }
    return path.join(resolved, "resources");
}

function rememberServer(dir: string, serverDir: string): void {
    const file = path.join(dir, "open77-ts.json");
    if (!existsSync(file)) throw new Error(`Missing ${file}`);
    const config = JSON.parse(readFileSync(file, "utf8")) as Record<string, unknown>;
    config.serverResourcesDir = resourcesDir(serverDir);
    writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

function detectServers(): string[] {
    const found = new Set<string>();
    const add = (directory: string) => {
        if (existsSync(path.join(directory, "server.jsonc")) || existsSync(path.join(directory, "server.json"))) found.add(path.resolve(directory));
    };
    if (process.env.OPEN77_SERVER) add(process.env.OPEN77_SERVER);
    let current = process.cwd();
    for (let depth = 0; depth < 6; depth += 1) {
        add(current);
        const parent = path.dirname(current);
        if (parent === current) break;
        current = parent;
    }
    const neighbor = path.dirname(compiler.repoRoot());
    if (existsSync(neighbor)) {
        for (const entry of readdirSync(neighbor)) {
            const candidate = path.join(neighbor, entry);
            if (statSafe(candidate)?.isDirectory()) add(candidate);
        }
    }
    return [...found];
}

function statSafe(file: string): ReturnType<typeof statSync> | undefined {
    try {
        return statSync(file);
    } catch {
        return undefined;
    }
}

function directoryEmpty(directory: string): boolean {
    if (!existsSync(directory)) return true;
    return readdirSync(directory).length === 0;
}

function writeProjectPackage(destination: string): void {
    const file = path.join(destination, "package.json");
    if (existsSync(file)) return;
    const relative = path.relative(destination, compiler.repoRoot()).replace(/\\/g, "/");
    const spec = relative.startsWith(".") ? relative : `./${relative}`;
    const body = {
        name: path.basename(destination),
        private: true,
        scripts: {
            dev: "ts77 dev",
            build: "ts77 build",
            deploy: "ts77 deploy",
            validate: "ts77 validate",
        },
        devDependencies: {
            ts2077: `file:${spec}`,
        },
    };
    writeFileSync(file, `${JSON.stringify(body, null, 2)}\n`, "utf8");
}

function installDependencies(destination: string, template: string): number {
    const npm = process.platform === "win32" ? "npm.cmd" : "npm";
    const rootInstall = spawnSync(npm, ["install"], { cwd: destination, stdio: "inherit" });
    if (rootInstall.status !== 0) return rootInstall.status ?? 1;
    const ui = template === "webui" ? path.join(destination, "ui") : template === "fullstack" ? path.join(destination, "src", "webui") : undefined;
    if (!ui || !existsSync(path.join(ui, "package.json"))) return 0;
    const uiInstall = spawnSync(npm, ["install"], { cwd: ui, stdio: "inherit" });
    return uiInstall.status ?? 1;
}

function createdMessage(destination: string, template: string, installed: boolean, serverConfigured: boolean): void {
    const name = path.basename(destination);
    process.stdout.write(`TS77 project created.\n\nNext steps:\n\ncd ${name}\n`);
    if (!installed) process.stdout.write("npm install\n");
    if (template === "webui" && !installed) process.stdout.write("npm install --prefix ui\n");
    if (template === "fullstack" && !installed) process.stdout.write("npm install --prefix src/webui\n");
    process.stdout.write("npm run dev\n\nYour plugin is ready for TypeScript development.\n\nRun npm run build when you are ready to produce the resource.\n");
    if (serverConfigured) process.stdout.write("Run npm run deploy to copy it into the server resources directory. Restart the resource in OPEN//77 after copying. This tool does not reload the game server by itself.\n");
    else process.stdout.write("Deployment is not configured. Create again with --server <server-directory>, or set serverResourcesDir in open77-ts.json.\n");
}

function ask(prompt: string): Promise<string> {
    const input = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        input.question(prompt, (answer) => {
            input.close();
            resolve(answer.trim());
        });
    });
}

async function wizard(args: string[]): Promise<{ name: string; template: string; server?: string; install: boolean } | number> {
    if (!process.stdin.isTTY || args.includes("--yes")) return 1;
    const detected = detectServers();
    const name = (await ask("Plugin name [my_plugin]: ")) || "my_plugin";
    process.stdout.write("Template: 1 basic, 2 gameplay, 3 webui, 4 fullstack\n");
    const choice = (await ask("Template [1]: ")) || "1";
    const template = { "1": "basic", "2": "gameplay", "3": "webui", "4": "fullstack" }[choice];
    if (!template) {
        process.stderr.write("Choose a template from 1 to 4.\n");
        return 1;
    }
    let server = "";
    if (detected.length > 0) {
        const useDetected = (await ask(`Server detected at ${detected[0]}. Use it? [Y/n]: `)).toLowerCase();
        if (useDetected !== "n" && useDetected !== "no") server = detected[0];
    }
    if (!server) server = await ask("Server directory (leave empty to skip deployment): ");
    const installAnswer = (await ask("Install dependencies now? [Y/n]: ")).toLowerCase();
    return { name, template, server: server || undefined, install: installAnswer !== "n" && installAnswer !== "no" };
}

async function create(args: string[]): Promise<number> {
    let name = args.find((arg) => !arg.startsWith("--"));
    let template = argValue(args, "--template") ?? "basic";
    let server = argValue(args, "--server");
    let install = args.includes("--install");
    if (!name && process.stdin.isTTY && !args.includes("--yes")) {
        const answers = await wizard(args);
        if (typeof answers === "number") return answers;
        name = answers.name;
        template = answers.template;
        server = answers.server;
        install = answers.install;
    }
    if (!name) {
        usage();
        return 1;
    }
    if (!compiler.RESOURCE_NAME.test(name)) {
        process.stderr.write(`'${name}' is not a valid plugin name. Use a lowercase letter, then letters, digits, or underscores, 3 to 64 characters.\n`);
        return 1;
    }
    if (!TEMPLATE_NAMES.includes(template as (typeof TEMPLATE_NAMES)[number])) {
        process.stderr.write(`unknown template ${template}. Choose ${TEMPLATE_NAMES.join(", ")}.\n`);
        return 1;
    }
    const explicitOut = argValue(args, "--out");
    const destination = explicitOut ? path.resolve(explicitOut) : path.resolve(name);
    if (path.basename(destination) !== name) {
        process.stderr.write("the destination directory name must equal the resource name\n");
        return 1;
    }
    if (!directoryEmpty(destination) && !args.includes("--force")) {
        process.stderr.write(`${destination} already has files. Nothing was overwritten. Pass --force to copy template files over files of the same name.\n`);
        return 1;
    }
    copyTemplate(template, destination, name, false);
    writeProjectPackage(destination);
    compiler.writeTypeScriptProjects(destination);
    if (server) rememberServer(destination, server);
    if (args.includes("--no-install")) install = false;
    const installed = install ? installDependencies(destination, template) === 0 : false;
    if (install && !installed) {
        process.stderr.write("Dependency installation failed. The project files were still created.\n");
        createdMessage(destination, template, false, Boolean(server));
        return 1;
    }
    if (!quiet(args)) createdMessage(destination, template, installed, Boolean(server));
    return 0;
}

function watchDir(dir: string, dev: boolean): void {
    let timer: NodeJS.Timeout | undefined;
    let backend: ReturnType<typeof spawn> | undefined;
    let vite: ReturnType<typeof spawn> | undefined;
    const stopBackend = () => {
        if (!backend) return;
        backend.kill();
        backend = undefined;
    };
    const stopAll = () => {
        if (timer) clearTimeout(timer);
        stopBackend();
        if (vite) {
            vite.kill();
            vite = undefined;
        }
    };
    const startBackend = () => {
        stopBackend();
        const entry = backendScript(dir);
        if (!existsSync(entry)) return;
        backend = spawn(process.execPath, [entry], { cwd: dir, stdio: "inherit", env: companionEnv(dir) });
        backend.on("exit", (code) => process.stdout.write(`Node companion exited (${code ?? 0})\n`));
    };
    const run = () => {
        stopBackend();
        const code = build(dir, dev ? ["--dev"] : []);
        process.stdout.write(code === 0 ? "watch: build finished\n" : "watch: build failed\n");
        if (code === 0) startBackend();
    };
    process.on("SIGINT", () => {
        stopAll();
        process.exit(0);
    });
    process.on("SIGTERM", () => {
        stopAll();
        process.exit(0);
    });
    run();
    const source = path.join(dir, "src");
    if (!existsSync(source)) {
        process.stderr.write(`Nothing to watch. ${source} does not exist.\n`);
        return;
    }
    watch(source, { recursive: true }, () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(run, 200);
    });
    if (!dev) return;
    const uiCandidates = [path.join(dir, "ui"), path.join(dir, "src", "webui")];
    const ui = uiCandidates.find((candidate) => existsSync(path.join(candidate, "node_modules", "vite", "bin", "vite.js")));
    if (!ui) {
        process.stdout.write("WebUI dev server not started. Install dependencies in ui/ or src/webui/ if this plugin has an interface.\n");
        return;
    }
    vite = spawn(process.execPath, [path.join(ui, "node_modules", "vite", "bin", "vite.js"), "--host", "127.0.0.1"], { cwd: ui, stdio: "inherit" });
    vite.on("exit", (code) => process.stdout.write(`WebUI dev server exited (${code ?? 0})\n`));
}

function openDocs(page: string): void {
    if (process.platform === "win32") {
        spawn("powershell", ["-NoProfile", "-Command", `Start-Process -FilePath ${JSON.stringify(page)}`], { detached: true, stdio: "ignore" }).unref();
        return;
    }
    const opener = process.platform === "darwin" ? "open" : "xdg-open";
    spawn(opener, [page], { detached: true, stdio: "ignore" }).unref();
}

async function main(): Promise<number> {
    const [command, ...args] = process.argv.slice(2);
    if (!command || command === "--help" || command === "-h" || command === "help") {
        usage();
        return 0;
    }
    if (command === "--version" || command === "-v" || command === "version") {
        process.stdout.write(`${packageInfo().version ?? "0.0.0"}\n`);
        return 0;
    }
    if (command === "docs") {
        const page = path.join(compiler.repoRoot(), "docs", "index.html");
        const guide = path.join(compiler.repoRoot(), "docs", "README.md");
        process.stdout.write(`${page}\n${guide}\n`);
        if (args.includes("--open")) openDocs(page);
        return existsSync(page) ? 0 : 1;
    }
    if (command === "update") {
        const catalogueFile = path.join(compiler.repoRoot(), "packages", "types", "generated", "catalogue.json");
        if (!existsSync(catalogueFile)) {
            process.stderr.write("No catalogue is generated yet. Run ts77 types after the Devkit index exists.\n");
            return 1;
        }
        const catalogue = JSON.parse(readFileSync(catalogueFile, "utf8")) as { build?: string };
        process.stdout.write(`Declarations are for OPEN//77 ${catalogue.build ?? "unknown"}.\n`);
        process.stdout.write("To refresh them, run npx -y @open2077/mcp init against the server, then ts77 types.\n");
        process.stdout.write("ts77 update does not download a new index and does not publish a package.\n");
        return 0;
    }
    if (command === "types") {
        const script = path.join(compiler.repoRoot(), "packages", "types", "dist", "generate.js");
        if (!existsSync(script)) {
            process.stderr.write("packages/types/dist/generate.js is missing. Build the tools first.\n");
            return 1;
        }
        const result = spawnSync(process.execPath, [script], { stdio: "inherit" });
        return result.status ?? 1;
    }
    if (command === "doctor") {
        const lines = compiler.doctor(args.find((arg) => !arg.startsWith("--")));
        for (const line of lines) process.stdout.write(`${line.level}: ${line.text}\n`);
        return lines.some((line) => line.level === "fail") ? 1 : 0;
    }
    if (command === "create") return create(args);
    if (command === "init") {
        const dir = path.resolve(args.find((arg) => !arg.startsWith("--")) ?? process.cwd());
        const name = path.basename(dir);
        if (!compiler.RESOURCE_NAME.test(name)) {
            process.stderr.write(`The directory name '${name}' is not a valid resource name.\n`);
            return 1;
        }
        if (existsSync(path.join(dir, "open77-ts.json"))) {
            process.stdout.write("open77-ts.json already exists. Existing files were left unchanged.\n");
            return 0;
        }
        copyTemplate("basic", dir, name, true);
        writeProjectPackage(dir);
        compiler.writeTypeScriptProjects(dir);
        const server = argValue(args, "--server");
        if (server) rememberServer(dir, server);
        process.stdout.write(`initialized ${dir}\n`);
        return 0;
    }
    if (command === "map") {
        const file = args[0];
        const line = Number(args[1]);
        const column = args[2] === undefined ? 0 : Number(args[2]);
        if (!file || !Number.isFinite(line)) {
            usage();
            return 1;
        }
        const mapped = await compiler.mapLuaPosition(path.resolve(file), line, column);
        const resource = compiler.resourceNameFromLua(path.resolve(file));
        if (!mapped?.source || !mapped.line) {
            process.stdout.write(`[OPEN77-TS] Resource: ${resource}\nNo TypeScript position for ${file}:${line}. The sandbox does not expose debug, so this only works when a source map is present on the developer machine.\n`);
            return 1;
        }
        process.stdout.write(`[OPEN77-TS] Resource: ${resource}\n\nRuntime Error:\n${mapped.source}:${mapped.line}\n`);
        return 0;
    }
    const dir = projectDir(args);
    if (command === "build") return build(dir, args);
    if (command === "deploy") {
        const server = argValue(args, "--server");
        if (server) rememberServer(dir, server);
        const configFile = path.join(dir, "open77-ts.json");
        if (!existsSync(configFile)) {
            process.stderr.write(`Missing ${configFile}. Run this command inside a TS77 plugin.\n`);
            return 1;
        }
        const config = JSON.parse(readFileSync(configFile, "utf8")) as { serverResourcesDir?: string };
        if (!config.serverResourcesDir) {
            process.stderr.write("Deployment is not configured. Pass --server <server-directory> or set serverResourcesDir in open77-ts.json.\n");
            return 1;
        }
        const code = build(dir, [...args, "--deploy"]);
        if (code === 0) process.stdout.write("Copied the resource. Restart that resource on the OPEN//77 server. TS77 did not reload the server.\n");
        return code;
    }
    if (command === "validate") {
        const result = compiler.validateResource(dir);
        for (const message of result.messages) process.stdout.write(`${message}\n`);
        process.stdout.write(result.ok ? "validate: ok\n" : "validate: failed\n");
        return result.ok ? 0 : 1;
    }
    if (command === "watch") {
        watchDir(dir, false);
        return 0;
    }
    if (command === "dev") {
        watchDir(dir, true);
        return 0;
    }
    usage();
    return 1;
}

void main().then((code) => {
    if (code !== 0) process.exitCode = code;
}).catch((error: unknown) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
});
