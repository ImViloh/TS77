import { mkdirSync, readFileSync, writeFileSync, existsSync, cpSync, readdirSync, statSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { spawnSync } from "node:child_process";
import ts from "typescript";
import * as tstl from "typescript-to-lua";
import luaparse from "luaparse";
import { hardenBundle } from "./bundle";
import { loadCatalogue, loadConfig, repoRoot, resolveToolchain, RESOURCE_NAME } from "./config";
import { renderManifest } from "./manifest";
import { scanLua } from "./permissions";
import { findUnsupported, findSpecifierProblems, specifiersInText } from "./syntax";

export interface BuildOptions {
    dev?: boolean;
    buildWeb?: boolean;
    deploy?: boolean;
}

export interface BuildResult {
    ok: boolean;
    messages: string[];
    permissions: string[];
    outputs: string[];
}

interface ModuleFile {
    moduleName: string;
    output: string;
    source: string;
    map?: string;
}

export function buildResource(resourceDir: string, options: BuildOptions = {}): BuildResult {
    const root = path.resolve(resourceDir);
    const messages: string[] = [];
    const config = loadConfig(root);
    if (!RESOURCE_NAME.test(config.name)) {
        return { ok: false, messages: [`resource name '${config.name}' must be a lowercase slug of 3 to 64 characters`], permissions: [], outputs: [] };
    }
    if (path.basename(root) !== config.name) {
        return { ok: false, messages: [`directory name '${path.basename(root)}' must match resource '${config.name}'`], permissions: [], outputs: [] };
    }
    const catalogue = loadCatalogue();
    const buildClient = config.targets.includes("open77-client");
    const buildServer = config.targets.includes("open77-server");
    const buildNode = config.targets.includes("node");
    const buildWebTarget = config.targets.includes("webui");
    if (buildNode && !config.backend) return { ok: false, messages: ["the node target requires a backend entry"], permissions: [], outputs: [] };
    const entry = options.dev && config.webDevEntry ? config.webDevEntry : config.webEntry;
    writeFlags(root, entry);
    if (buildClient) writeTsconfig(root, "client", config.client);
    if (buildServer) writeTsconfig(root, "server", config.server);
    const problems = [
        ...(buildClient ? checkSide(root, "client") : []),
        ...(buildServer ? checkSide(root, "server") : []),
        ...(buildWebTarget && config.webRoot ? scanSurface(path.join(root, config.webRoot), "webui") : []),
        ...(buildNode ? scanSurface(path.join(root, "src", "backend"), "node") : []),
    ];
    if (problems.length > 0) return { ok: false, messages: problems, permissions: [], outputs: [] };

    const clientLua = buildClient ? transpile(root, "client", config.client) : undefined;
    const serverLua = buildServer ? transpile(root, "server", config.server) : undefined;
    const modules = buildClient ? compileClientModules(root) : { errors: [] as string[], files: [] as ModuleFile[] };
    const transpileErrors = [...(clientLua?.errors ?? []), ...(serverLua?.errors ?? []), ...modules.errors];
    if (transpileErrors.length > 0) return { ok: false, messages: transpileErrors, permissions: [], outputs: [] };
    const clientScan = clientLua ? scanLua(clientLua.source, "client", catalogue) : { permissions: [] as string[], unknown: [] as string[], wrongSide: [] as string[] };
    const serverScan = serverLua ? scanLua(serverLua.source, "server", catalogue) : { permissions: [] as string[], unknown: [] as string[], wrongSide: [] as string[] };
    const scanProblems = [
        ...clientScan.unknown.map((name) => `client lua calls unknown native ${name}`),
        ...serverScan.unknown.map((name) => `server lua calls unknown native ${name}`),
        ...clientScan.wrongSide.map((name) => `client lua calls server native ${name}`),
        ...serverScan.wrongSide.map((name) => `server lua calls client native ${name}`),
    ];
    for (const file of modules.files) {
        const scan = scanLua(file.source, "client", catalogue);
        clientScan.permissions.push(...scan.permissions);
        scanProblems.push(...scan.unknown.map((name) => `client module ${file.moduleName} calls unknown native ${name}`));
        scanProblems.push(...scan.wrongSide.map((name) => `client module ${file.moduleName} calls server native ${name}`));
        if (file.source.includes("setmetatable")) scanProblems.push(`client module ${file.moduleName} contains setmetatable, which the client sandbox removes`);
    }
    if (clientLua?.source.includes("setmetatable")) scanProblems.push("client bundle contains setmetatable, which the client sandbox removes");
    if ((clientLua?.source.includes("debug.getinfo") || serverLua?.source.includes("debug.getinfo") || clientLua?.source.includes("debug.traceback") || serverLua?.source.includes("debug.traceback"))) {
        scanProblems.push("bundle uses the debug library, which the OPEN//77 sandbox does not expose");
    }
    if (scanProblems.length > 0) return { ok: false, messages: scanProblems, permissions: [], outputs: [] };

    const outputs: string[] = [];
    if (clientLua) {
        mkdirSync(path.join(root, "dist", "client"), { recursive: true });
        const clientOut = path.join(root, "dist", "client", "main.lua");
        writeFileSync(clientOut, clientLua.source, "utf8");
        if (clientLua.map) writeFileSync(`${clientOut}.map`, clientLua.map, "utf8");
        outputs.push(clientOut);
    }
    for (const file of modules.files) {
        mkdirSync(path.dirname(file.output), { recursive: true });
        writeFileSync(file.output, file.source, "utf8");
        if (file.map) writeFileSync(`${file.output}.map`, file.map, "utf8");
        outputs.push(file.output);
    }
    if (serverLua) {
        mkdirSync(path.join(root, "dist", "server"), { recursive: true });
        const serverOut = path.join(root, "dist", "server", "main.lua");
        writeFileSync(serverOut, serverLua.source, "utf8");
        if (serverLua.map) writeFileSync(`${serverOut}.map`, serverLua.map, "utf8");
        outputs.push(serverOut);
    }
    if (buildNode && config.backend) {
        const nodeErrors = compileBackend(root, config.backend);
        if (nodeErrors.length > 0) return { ok: false, messages: nodeErrors, permissions: [], outputs: [] };
        outputs.push(path.join(root, "dist", "backend", "index.js"));
    }

    if (buildWebTarget && options.buildWeb !== false && config.webRoot) {
        const webMessage = buildWeb(path.join(root, config.webRoot));
        if (webMessage && config.explicitTargets) return { ok: false, messages: [webMessage], permissions: [], outputs: [] };
        if (webMessage) messages.push(webMessage);
    }
    const permissions = [...new Set([...config.permissions, ...clientScan.permissions, ...serverScan.permissions])].sort();
    const manifest = renderManifest(config, permissions, catalogue.build, root);
    const manifestPath = path.join(root, "open77.lua");
    writeFileSync(manifestPath, manifest, "utf8");
    if (options.deploy && config.serverResourcesDir) {
        deploy(root, path.join(config.serverResourcesDir, config.name));
        messages.push(`deployed to ${path.join(config.serverResourcesDir, config.name)}`);
    }
    outputs.push(manifestPath);
    return {
        ok: true,
        messages,
        permissions,
        outputs,
    };
}

export function validateResource(resourceDir: string): BuildResult {
    const root = path.resolve(resourceDir);
    const messages: string[] = [];
    const manifestPath = path.join(root, "open77.lua");
    if (!existsSync(manifestPath)) return { ok: false, messages: ["open77.lua is missing. Run the build first."], permissions: [], outputs: [] };
    const manifest = readFileSync(manifestPath, "utf8");
    const refs = [...manifest.matchAll(/(?:client_script|server_script|web_file|file)\s+"([^"]+)"/g)].map((match) => match[1]);
    if (refs.length === 0) messages.push("manifest has no script or web file references");
    for (const relative of refs) {
        const absolute = path.join(root, relative);
        if (!existsSync(absolute)) messages.push(`manifest references missing file ${relative}`);
    }
    for (const relative of ["dist/client/main.lua", "dist/server/main.lua"]) {
        const absolute = path.join(root, relative);
        if (!existsSync(absolute)) continue;
        const source = readFileSync(absolute, "utf8");
        try {
            luaparse.parse(source, { luaVersion: "5.3" });
        } catch (error) {
            messages.push(`${relative} is not valid Lua: ${(error as Error).message}`);
        }
        if (source.includes("local ____originalRequire = require")) messages.push(`${relative} still falls back to the global require`);
        if (relative.startsWith("dist/server") && /\brequire\s*\(/.test(source.replace(/local function require/g, ""))) {
            const callsGlobal = /____originalRequire\s*=\s*require/.test(source);
            if (callsGlobal) messages.push("server bundle reads the global require");
        }
    }
    const catalogue = loadCatalogue();
    if (existsSync(path.join(root, "dist", "client", "main.lua"))) {
        const scan = scanLua(readFileSync(path.join(root, "dist", "client", "main.lua"), "utf8"), "client", catalogue);
        messages.push(...scan.wrongSide.map((name) => `client calls server native ${name}`));
        messages.push(...scan.unknown.map((name) => `client calls unknown native ${name}`));
    }
    if (existsSync(path.join(root, "dist", "server", "main.lua"))) {
        const scan = scanLua(readFileSync(path.join(root, "dist", "server", "main.lua"), "utf8"), "server", catalogue);
        messages.push(...scan.wrongSide.map((name) => `server calls client native ${name}`));
        messages.push(...scan.unknown.map((name) => `server calls unknown native ${name}`));
    }
    return { ok: messages.length === 0, messages, permissions: [], outputs: refs.map((relative) => path.join(root, relative)) };
}

function writeFlags(resourceDir: string, entry: string): void {
    const directory = path.join(resourceDir, "src", "generated");
    mkdirSync(directory, { recursive: true });
    const literal = JSON.stringify(entry);
    writeFileSync(path.join(directory, "flags.ts"), `/** Generated by open77-ts. */\nexport const webuiEntry = ${literal};\n`, "utf8");
}

function tsPath(fromDir: string, file: string): string {
    const relative = path.relative(fromDir, file);
    if (path.isAbsolute(relative)) return file.replace(/\\/g, "/");
    const slash = relative.replace(/\\/g, "/");
    return slash.startsWith(".") ? slash : `./${slash}`;
}

function writeTsconfig(resourceDir: string, runtime: "client" | "server", entry: string): void {
    const sdkRoot = path.join(repoRoot(), "packages", "sdk", "src");
    const types = path.join(repoRoot(), "packages", "types", "generated", `${runtime}.d.ts`);
    const paths: Record<string, string[]> = {
        "@open77/sdk/shared": [tsPath(resourceDir, path.join(sdkRoot, "shared", "index.ts"))],
        "@open77-ts/shared": [tsPath(resourceDir, path.join(repoRoot(), "packages", "shared", "src", "contracts.ts"))],
    };
    paths[`@open77/sdk/${runtime}`] = [tsPath(resourceDir, path.join(sdkRoot, runtime, "index.ts"))];
    paths[`@open77-ts/${runtime}`] = [tsPath(resourceDir, path.join(sdkRoot, runtime, "index.ts"))];
    if (runtime === "server") paths["@open77-ts/server/bridge"] = [tsPath(resourceDir, path.join(sdkRoot, "server", "bridge.ts"))];
    const config = {
        compilerOptions: {
            target: "ESNext",
            module: "commonjs",
            moduleResolution: "bundler",
            strict: true,
            types: [] as string[],
            lib: ["ESNext"],
            skipLibCheck: true,
            sourceMap: true,
            ignoreDeprecations: "6.0",
            baseUrl: resourceDir,
            paths,
        },
        include: [
            `src/${runtime}/**/*.ts`,
            "src/shared/**/*.ts",
            "src/generated/**/*.ts",
            ...(runtime === "client" ? ["src/modules/**/*.ts"] : []),
            tsPath(resourceDir, types),
        ],
        tstl: {
            luaTarget: "5.4",
            luaLibImport: "inline",
            luaBundle: path.join(resourceDir, "dist", runtime, "main.lua"),
            luaBundleEntry: path.join(resourceDir, entry),
            noImplicitSelf: true,
            sourceMapTraceback: false,
        },
    };
    writeFileSync(path.join(resourceDir, `tsconfig.${runtime}.json`), JSON.stringify(config, null, 2), "utf8");
}

function checkSide(resourceDir: string, runtime: "client" | "server"): string[] {
    const configPath = path.join(resourceDir, `tsconfig.${runtime}.json`);
    const read = ts.readConfigFile(configPath, ts.sys.readFile);
    const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, resourceDir);
    const program = ts.createProgram(parsed.fileNames, parsed.options);
    const problems: string[] = [];
    for (const file of program.getSourceFiles()) {
        if (file.isDeclarationFile) continue;
        if (file.fileName.includes("node_modules")) continue;
        problems.push(...findUnsupported(file, runtime));
    }
    return problems;
}

function transpile(resourceDir: string, runtime: "client" | "server", entry: string): { source: string; map?: string; errors: string[] } {
    const luaName = path.join(resourceDir, "dist", runtime, "main.lua");
    const note = `resource=${path.basename(resourceDir)} runtime=${runtime} entry=${entry.replace(/\\/g, "/")}`;
    return transpileConfig(resourceDir, `tsconfig.${runtime}.json`, luaName, note, `${runtime} bundle was not emitted`);
}

function transpileConfig(resourceDir: string, configName: string, luaOutput: string, note: string, missing: string): { source: string; map?: string; errors: string[] } {
    const captured = new Map<string, string>();
    const result = tstl.transpileProject(path.join(resourceDir, configName), {}, (fileName, data) => {
        captured.set(path.normalize(fileName), data);
    });
    const errors = result.diagnostics
        .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
        .map(formatDiagnostic);
    if (result.emitSkipped || errors.length > 0) return { source: "", errors };
    const luaName = path.normalize(luaOutput);
    const source = captured.get(luaName);
    if (!source) return { source: "", errors: [missing] };
    const map = captured.get(path.normalize(`${luaName}.map`));
    return { source: hardenBundle(source, note), map, errors: [] };
}

function formatDiagnostic(diagnostic: ts.Diagnostic): string {
    const text = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    if (diagnostic.file && diagnostic.start !== undefined) {
        const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        return `${diagnostic.file.fileName}:${position.line + 1}:${position.character + 1}: ${text}`;
    }
    return text;
}

function buildWeb(uiDir: string): string | undefined {
    const vite = path.join(uiDir, "node_modules", "vite", "bin", "vite.js");
    if (!existsSync(vite)) return `WebUI dependencies are not installed in ${uiDir}. Run npm install there before building the interface.`;
    const result = spawnSync(process.execPath, [vite, "build"], { cwd: uiDir, encoding: "utf8" });
    if (result.status !== 0) return `WebUI build failed\n${result.stdout ?? ""}\n${result.stderr ?? ""}`;
    return undefined;
}

function scanSurface(directory: string, surface: "webui" | "node"): string[] {
    const pageSource = path.join(directory, "src");
    const start = surface === "webui" && existsSync(pageSource) ? pageSource : directory;
    if (!existsSync(start)) return [`missing ${surface} directory ${directory}`];
    const problems: string[] = [];
    const visit = (current: string): void => {
        for (const entry of readdirSync(current)) {
            if (entry === "node_modules" || entry === "dist") continue;
            const absolute = path.join(current, entry);
            if (statSync(absolute).isDirectory()) {
                visit(absolute);
                continue;
            }
            if (!absolute.endsWith(".ts") && !absolute.endsWith(".tsx")) continue;
            const text = readFileSync(absolute, "utf8");
            if (absolute.endsWith(".d.ts")) continue;
            for (const specifier of specifiersInText(text)) {
                const problem = findSpecifierProblems(absolute, specifier, surface);
                if (problem) problems.push(problem);
            }
        }
    };
    visit(start);
    return problems;
}

const MODULE_SEGMENT = /^[A-Za-z_][A-Za-z0-9_-]*$/;

function compileClientModules(resourceDir: string): { errors: string[]; files: ModuleFile[] } {
    clearGeneratedModules(resourceDir);
    const sourceRoot = path.join(resourceDir, "src", "modules");
    if (!existsSync(sourceRoot)) return { errors: [], files: [] };
    const errors: string[] = [];
    const files: ModuleFile[] = [];
    const published = new Map<string, string>();
    for (const source of listTypeScript(sourceRoot)) {
        const relative = path.relative(sourceRoot, source).replace(/\\/g, "/").replace(/\.tsx?$/, "");
        const segments = relative.split("/");
        if (segments.some((segment) => !MODULE_SEGMENT.test(segment))) {
            errors.push(`${source}: module file names use letters, digits, underscores, and hyphens`);
            continue;
        }
        const outputSegments = [...segments];
        if (outputSegments[outputSegments.length - 1] === "index") outputSegments[outputSegments.length - 1] = "init";
        const moduleName = ["modules", ...(outputSegments[outputSegments.length - 1] === "init" ? outputSegments.slice(0, -1) : outputSegments)].join(".");
        const previous = published.get(moduleName);
        if (previous) errors.push(`${source}: '${moduleName}' is already published by ${previous}`);
        published.set(moduleName, source);
        const output = path.join(resourceDir, "modules", `${outputSegments.join("/")}.lua`);
        const configName = "tsconfig.module.json";
        writeModuleTsconfig(resourceDir, source, output);
        const compiled = transpileConfig(resourceDir, configName, output, `module ${moduleName}`, `client module ${moduleName} was not emitted`);
        if (compiled.errors.length > 0) {
            errors.push(...compiled.errors);
            continue;
        }
        files.push({ moduleName, output, source: compiled.source, map: compiled.map });
    }
    return { errors, files };
}

function writeModuleTsconfig(resourceDir: string, entry: string, luaOutput: string): void {
    const sdkRoot = path.join(repoRoot(), "packages", "sdk", "src");
    const types = path.join(repoRoot(), "packages", "types", "generated", "client.d.ts");
    const config = {
        compilerOptions: {
            target: "ESNext",
            module: "commonjs",
            moduleResolution: "bundler",
            strict: true,
            types: [] as string[],
            lib: ["ESNext"],
            skipLibCheck: true,
            sourceMap: true,
            ignoreDeprecations: "6.0",
            baseUrl: resourceDir,
            paths: {
                "@open77/sdk/shared": [tsPath(resourceDir, path.join(sdkRoot, "shared", "index.ts"))],
                "@open77-ts/shared": [tsPath(resourceDir, path.join(repoRoot(), "packages", "shared", "src", "contracts.ts"))],
                "@open77/sdk/client": [tsPath(resourceDir, path.join(sdkRoot, "client", "index.ts"))],
                "@open77-ts/client": [tsPath(resourceDir, path.join(sdkRoot, "client", "index.ts"))],
            },
        },
        include: [
            tsPath(resourceDir, entry),
            "src/shared/**/*.ts",
            "src/generated/**/*.ts",
            tsPath(resourceDir, types),
        ],
        tstl: {
            luaTarget: "5.4",
            luaLibImport: "inline",
            luaBundle: luaOutput,
            luaBundleEntry: entry,
            noImplicitSelf: true,
            sourceMapTraceback: false,
        },
    };
    writeFileSync(path.join(resourceDir, "tsconfig.module.json"), JSON.stringify(config, null, 2), "utf8");
}

function clearGeneratedModules(resourceDir: string): void {
    const directory = path.join(resourceDir, "modules");
    if (!existsSync(directory)) return;
    const visit = (current: string): void => {
        for (const entry of readdirSync(current)) {
            const absolute = path.join(current, entry);
            if (statSync(absolute).isDirectory()) {
                visit(absolute);
                continue;
            }
            const lua = absolute.endsWith(".lua.map") ? absolute.slice(0, -4) : absolute;
            if (!lua.endsWith(".lua") || !existsSync(lua)) continue;
            const head = readFileSync(lua, "utf8").slice(0, 120);
            if (!head.includes("[OPEN77-TS] module")) continue;
            rmSync(lua, { force: true });
            rmSync(`${lua}.map`, { force: true });
        }
    };
    visit(directory);
}

function listTypeScript(directory: string): string[] {
    const found: string[] = [];
    const visit = (current: string): void => {
        for (const entry of readdirSync(current)) {
            if (entry === "node_modules" || entry === "dist") continue;
            const absolute = path.join(current, entry);
            if (statSync(absolute).isDirectory()) {
                visit(absolute);
                continue;
            }
            if (absolute.endsWith(".d.ts")) continue;
            if (absolute.endsWith(".ts") || absolute.endsWith(".tsx")) found.push(absolute);
        }
    };
    visit(directory);
    return found.sort();
}

function compileBackend(resourceDir: string, entry: string): string[] {
    const source = path.join(resourceDir, entry);
    if (!existsSync(source)) return [`missing backend entry ${entry}`];
    const sourceDir = path.dirname(source);
    const ambient = path.join(sourceDir, "open77-npm.d.ts");
    rmSync(ambient, { force: true });
    const configPath = path.join(resourceDir, "tsconfig.node.json");
    const toolchain = repoRoot();
    const config = {
        compilerOptions: {
            target: "ES2022",
            module: "commonjs",
            moduleResolution: "node",
            strict: true,
            outDir: path.join(resourceDir, "dist", "backend"),
            rootDir: sourceDir,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            skipLibCheck: true,
            types: ["node"],
            typeRoots: [path.join(toolchain, "node_modules", "@types"), path.join(resourceDir, "node_modules", "@types")],
            ignoreDeprecations: "6.0",
            baseUrl: resourceDir,
            paths: {
                "@open77-ts/node": [tsPath(resourceDir, path.join(toolchain, "packages", "node", "dist", "index.d.ts"))],
                "@open77-ts/shared": [tsPath(resourceDir, path.join(toolchain, "packages", "shared", "dist", "index.d.ts"))],
            },
        },
        include: [`${tsPath(resourceDir, sourceDir)}/**/*.ts`],
    };
    writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
    const first = runBackendTsc(configPath);
    if (first.status === 0) return [];
    const output = `${first.stdout ?? ""}\n${first.stderr ?? ""}`;
    const missingTypes = [...output.matchAll(/error TS7016: Could not find a declaration file for module '([^']+)'/g)].map((match) => match[1]);
    const missingModules = [...output.matchAll(/error TS2307: Cannot find module '([^']+)'/g)].map((match) => match[1]);
    const unresolved = [...new Set(missingModules)].filter((name) => !packageResolvable(resourceDir, name));
    if (unresolved.length > 0) {
        return unresolved.map((name) => `Node module '${name}' is imported from src/backend but is not installed. From the resource directory run: npm install ${name}\nThat package runs in the Node companion. It is not loaded into the Lua sandbox.`);
    }
    const ambientNames = [...new Set([...missingTypes, ...missingModules])];
    if (ambientNames.length === 0) return [`Node companion compile failed\n${output}`.trim()];
    const declarations = ambientNames.map((name) => `declare module ${JSON.stringify(name)};`).join("\n");
    writeFileSync(ambient, `/** Generated by open77-ts for npm packages that do not ship types. */\n${declarations}\n`, "utf8");
    const second = runBackendTsc(configPath);
    if (second.status === 0) return [];
    return [`Node companion compile failed\n${second.stdout ?? ""}\n${second.stderr ?? ""}`.trim()];
}

function runBackendTsc(configPath: string): { status: number | null; stdout: string; stderr: string } {
    const tsc = resolveToolchain("typescript/lib/tsc.js");
    const result = spawnSync(process.execPath, [tsc, "-p", configPath, "--pretty", "false"], { encoding: "utf8" });
    return { status: result.status, stdout: result.stdout ?? "", stderr: result.stderr ?? "" };
}

function packageResolvable(resourceDir: string, name: string): boolean {
    if (name.startsWith(".")) return true;
    const resolve = createRequire(path.join(repoRoot(), "package.json")).resolve;
    try {
        resolve(name, { paths: [resourceDir, repoRoot()] });
        return true;
    } catch {
        return false;
    }
}

function deploy(resourceDir: string, destination: string): void {
    mkdirSync(destination, { recursive: true });
    for (const relative of ["open77.lua", "dist", "web", "modules", "files"]) {
        const from = path.join(resourceDir, relative);
        if (!existsSync(from)) continue;
        cpSync(from, path.join(destination, relative), { recursive: true });
    }
}
