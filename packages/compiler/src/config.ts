import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

export interface ResourceConfig {
    name: string;
    version: string;
    autoStart: boolean;
    client: string;
    server: string;
    backend?: string;
    targets: string[];
    explicitTargets: boolean;
    dependencies: string[];
    permissions: string[];
    webEntry: string;
    webDevEntry?: string;
    webRoot?: string;
    serverResourcesDir?: string;
}

export interface CatalogueFile {
    build: string;
    reservedPrefixes: string[];
    counts: { client: number; server: number; shared: number };
    client: Record<string, { permissions: string[]; since: string | null }>;
    server: Record<string, { permissions: string[]; since: string | null }>;
}

export function repoRoot(): string {
    return path.resolve(__dirname, "..", "..", "..");
}

export function cataloguePath(): string {
    return path.join(repoRoot(), "packages", "types", "generated", "catalogue.json");
}

export function loadCatalogue(): CatalogueFile {
    return JSON.parse(readFileSync(cataloguePath(), "utf8")) as CatalogueFile;
}

export function resolveToolchain(request: string): string {
    try {
        return createRequire(path.join(repoRoot(), "package.json")).resolve(request);
    } catch {
        return path.join(repoRoot(), "node_modules", request);
    }
}

export function loadConfig(resourceDir: string): ResourceConfig {
    const file = path.join(resourceDir, "open77-ts.json");
    if (!existsSync(file)) throw new Error(`Missing ${file}`);
    const raw = {
        ...(JSON.parse(readFileSync(file, "utf8")) as Record<string, unknown>),
        ...readOverlay(resourceDir),
    } as Partial<ResourceConfig> & {
        web?: { entry?: string; devEntry?: string; root?: string };
        targets?: string[];
        backend?: string;
    };
    if (!raw.name || !raw.version) throw new Error("open77-ts.json requires name and version");
    const explicitTargets = Array.isArray(raw.targets);
    const webRoot = raw.web?.root ?? raw.webRoot;
    const targets = explicitTargets
        ? [...raw.targets!]
        : ["open77-client", "open77-server", ...(webRoot ? ["webui"] : []), ...(raw.backend ? ["node"] : [])];
    return {
        name: raw.name,
        version: raw.version,
        autoStart: raw.autoStart !== false,
        client: raw.client ?? "src/client/main.ts",
        server: raw.server ?? "src/server/main.ts",
        backend: raw.backend,
        targets,
        explicitTargets,
        dependencies: raw.dependencies ?? [],
        permissions: raw.permissions ?? [],
        webEntry: raw.web?.entry ?? raw.webEntry ?? "web/index.html",
        webDevEntry: raw.web?.devEntry ?? raw.webDevEntry,
        webRoot,
        serverResourcesDir: raw.serverResourcesDir,
    };
}

export const RESOURCE_NAME = /^[a-z][a-z0-9_]{2,63}$/;

function readOverlay(resourceDir: string): Record<string, unknown> {
    let overlay: Record<string, unknown> = {};
    const jsonFile = path.join(resourceDir, "ts77.config.json");
    if (existsSync(jsonFile)) overlay = { ...overlay, ...objectConfig(JSON.parse(readFileSync(jsonFile, "utf8")), jsonFile) };
    const tsFile = path.join(resourceDir, "ts77.config.ts");
    if (!existsSync(tsFile)) return overlay;
    const compiled = ts.transpileModule(readFileSync(tsFile, "utf8"), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
        fileName: tsFile,
    }).outputText;
    const module = { exports: {} as Record<string, unknown> };
    const runner = new Function("exports", "require", "module", compiled) as (
        exports: Record<string, unknown>,
        require: NodeRequire,
        module: { exports: Record<string, unknown> },
    ) => void;
    runner(module.exports, require, module);
    const value = module.exports.default ?? module.exports;
    return { ...overlay, ...objectConfig(value, tsFile) };
}

function objectConfig(value: unknown, file: string): Record<string, unknown> {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${file} must export an object`);
    return value as Record<string, unknown>;
}
