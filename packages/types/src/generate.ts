import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";

interface ApiParam {
    name: string;
    type: string;
    optional: boolean;
    default: string | null;
}

interface ApiCard {
    namespace: string;
    name: string;
    summary: string;
    description: string;
    params: ApiParam[];
    returns: string[];
    runtime: "client" | "server";
    inferred: boolean;
    qualified: string;
    permissions: string[];
    reasons: string[];
    since: string | null;
    constant?: boolean;
}

interface EventsFile {
    reservedPrefixes?: { prefix: string }[];
}

interface IndexManifest {
    build: string;
}

const METHOD_NAMESPACES = new Set(["WebUI.Page", "Open77.Promise", "Open77.EventVerdict"]);
const RESERVED_PARAM = new Set([
    "arguments", "await", "break", "case", "catch", "class", "const", "continue", "debugger",
    "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for",
    "function", "if", "implements", "import", "in", "instanceof", "interface", "let", "new",
    "null", "package", "private", "protected", "public", "return", "static", "super", "switch",
    "this", "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield", "as",
    "async", "from", "of", "type", "string", "number", "boolean", "object", "symbol", "any",
    "unknown", "never",
]);

const BASE_GLOBALS = [
    "declare function assert(this: void, value: unknown, message?: string): unknown;",
    "declare function error(this: void, message: unknown, level?: number): never;",
    "declare function pcall(this: void, fn: Open77Callback, ...args: unknown[]): LuaMultiReturn<[boolean, unknown]>;",
    "declare function tonumber(this: void, value: unknown, base?: number): number | undefined;",
    "declare function tostring(this: void, value: unknown): string;",
    "declare function type(this: void, value: unknown): string;",
];

function opNumber(build: string): number {
    const match = build.match(/op77\.(\d+)/);
    return match ? Number(match[1]) : -1;
}

function indexDirectory(): string {
    const fromEnv = process.env.OPEN77_INDEX_DIR;
    if (fromEnv) return path.resolve(fromEnv);
    const root = path.join(os.homedir(), ".open77", "mcp", "index");
    if (!existsSync(root)) {
        throw new Error(`Open77 dev index not found at ${root}. Run npx -y @open2077/mcp init against the server first.`);
    }
    const builds = readdirSync(root).filter((name) => existsSync(path.join(root, name, "cards.json")));
    builds.sort((left, right) => opNumber(right) - opNumber(left));
    if (builds.length === 0) throw new Error(`No cards.json under ${root}`);
    return path.join(root, builds[0]);
}

function jsdoc(card: ApiCard): string {
    const lines: string[] = [];
    const push = (text: string) => {
        for (const line of text.replace(/\r\n/g, "\n").split("\n")) {
            lines.push(line.replace(/\*\//g, "* /"));
        }
    };
    push(card.summary || card.qualified);
    if (card.description) {
        lines.push("");
        push(card.description);
    }
    lines.push("");
    if (card.permissions.length > 0) lines.push(`@permission ${card.permissions.join(", ")}`);
    lines.push(`@since ${card.since ?? "unreleased"}`);
    if (card.reasons.length > 0) lines.push(`@failure ${card.reasons.join(", ")}`);
    lines.push(`@open77Return ${card.returns.join(" | ") || "void"}`);
    if (card.inferred) lines.push("@inferred Catalogue signature was inferred from the implementation.");
    if (card.constant) lines.push("Read-only constant table. Not a function.");
    return `/**\n${lines.map((line) => ` * ${line}`.trimEnd()).join("\n")}\n */`;
}

function mapParamType(raw: string): string {
    const lower = raw.trim().toLowerCase();
    if (lower === "string" || lower === "string?") return "string";
    if (lower === "integer" || lower === "number") return "number";
    if (lower === "boolean") return "boolean";
    if (lower === "table") return "Open77Table";
    if (lower === "function") return "Open77Callback";
    if (lower === "entity") return "number | string";
    if (lower === "vector3" || lower === "vector") return "Vector3";
    if (lower === "any" || lower === "value" || lower === "values") return "unknown";
    if (lower.includes("string[]")) return "string[]";
    if (lower.includes("function")) return "Open77Callback";
    if (lower.includes("vector")) return "Vector3";
    if (lower.includes("integer") && lower.includes("string")) return "number | string";
    if (lower.includes("number") && lower.includes("string")) return "number | string";
    if (lower.includes("string") && lower.includes("table")) return "string | Open77Table";
    if (lower.includes("boolean") && !lower.includes("string") && !lower.includes("table") && !lower.includes("number")) return "boolean";
    if (lower.includes("integer") || lower.includes("number")) return "number";
    if (lower.includes("table")) return "Open77Table";
    if (lower.includes("string")) return "string";
    return "unknown";
}

function hasFailure(text: string): boolean {
    return /\bnil\b|\bor false\b|\breason\b|\bfailure\b/i.test(text);
}

function classify(text: string): string {
    const value = text.trim().toLowerCase();
    if (value.startsWith("true") || value.startsWith("false") || value.startsWith("boolean")) return "boolean";
    if (value === "string" || value.startsWith("string,") || value.startsWith("string ") || value.includes("resource name")) return "string";
    if (/handler id|task id|timer id|request id|player id|\binteger\b|\bnumber\b/.test(value) && !value.includes("string")) return "number";
    if (value.includes("table") || value.includes("{")) return "Open77Table";
    if (value === "nil" || value.startsWith("nil,") || value.startsWith("nil ")) return "undefined";
    return "unknown";
}

function mapReturns(card: ApiCard): string {
    if (card.qualified === "Open77.webui.create" || card.qualified === "Open77.webui.default") {
        return "LuaMultiReturn<[WebUIPageApi | undefined, string | undefined]>";
    }
    const parts = card.returns ?? [];
    if (parts.length === 0) return "void";
    const blob = parts.join(" | ");
    const mentionsReason = /\breason\b/i.test(blob);
    if (parts.length >= 2 || mentionsReason) {
        const primary = classify(parts[0] ?? "unknown");
        const primaryType = hasFailure(parts[0] ?? "") || mentionsReason ? `${primary} | undefined` : primary;
        return `LuaMultiReturn<[${primaryType}, string | undefined]>`;
    }
    if (hasFailure(parts[0] ?? "")) {
        const primary = classify(parts[0] ?? "");
        return primary === "undefined" ? "undefined" : `${primary} | undefined`;
    }
    return classify(parts[0] ?? "unknown");
}

function isRest(param: ApiParam): boolean {
    return param.name === "..." || param.name === "…" || param.name.includes("...");
}

function paramName(param: ApiParam, index: number, used: Set<string>): string {
    if (isRest(param)) return "args";
    let cleaned = param.name.replace(/[^A-Za-z0-9_]/g, "_").replace(/^(\d)/, "_$1");
    if (!cleaned || RESERVED_PARAM.has(cleaned) || !/^[A-Za-z_]/.test(cleaned)) cleaned = `arg${index + 1}`;
    let name = cleaned;
    let suffix = 2;
    while (used.has(name)) {
        name = `${cleaned}_${suffix}`;
        suffix += 1;
    }
    used.add(name);
    return name;
}

function emitParams(params: ApiParam[]): string {
    const used = new Set<string>();
    let optional = false;
    const parts: string[] = [];
    for (let index = 0; index < params.length; index += 1) {
        const param = params[index];
        const name = paramName(param, index, used);
        if (isRest(param)) {
            parts.push(`...${name}: unknown[]`);
            continue;
        }
        if (param.optional) optional = true;
        const mark = optional ? "?" : "";
        parts.push(`${name}${mark}: ${mapParamType(param.type)}`);
    }
    return parts.join(", ");
}

function ident(name: string): boolean {
    return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
}

interface Tree {
    functions: ApiCard[];
    constants: ApiCard[];
    children: Map<string, Tree>;
}

function emptyTree(): Tree {
    return { functions: [], constants: [], children: new Map() };
}

function insertCard(root: Tree, card: ApiCard, skipped: string[]): void {
    if (card.namespace === "_G") {
        root.functions.push(card);
        return;
    }
    const parts = card.namespace.split(".");
    if (parts.some((part) => !ident(part)) || !ident(card.name)) {
        skipped.push(card.qualified);
        return;
    }
    let node = root;
    for (const part of parts) {
        let child = node.children.get(part);
        if (!child) {
            child = emptyTree();
            node.children.set(part, child);
        }
        node = child;
    }
    if (card.constant) node.constants.push(card);
    else node.functions.push(card);
}

function emitFunction(card: ApiCard, method: boolean): string {
    const params = emitParams(card.params);
    const header = method ? `${card.name}(${params})` : `function ${card.name}(this: void${params.length > 0 ? `, ${params}` : ""})`;
    const returns = mapReturns(card);
    const suffix = returns === "void" ? "" : `: ${returns}`;
    return `${jsdoc(card)}\n${header}${suffix};`;
}

function namespacePath(prefix: string, name: string): string {
    return prefix.length > 0 ? `${prefix}.${name}` : name;
}

function typeName(qualified: string): string {
    const raw = qualified.split(".").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
    return `${raw}Api`;
}

function memberSignature(card: ApiCard, method: boolean, owner: string): string {
    const params = emitParams(card.params);
    const returns = mapReturns(card);
    const type = returns === "void" ? "void" : returns;
    const receiver = method ? "" : `this: void${params.length > 0 ? ", " : ""}`;
    if (card.name === "new") {
        const self = method ? `this: ${owner}${params.length > 0 ? ", " : ""}` : receiver;
        return `new: (${self}${params}) => ${type};`;
    }
    return `${card.name}(${receiver}${params}): ${type};`;
}

function emitApi(qualified: string, node: Tree, skipped: string[]): string[] {
    const blocks: string[] = [];
    for (const name of [...node.children.keys()].sort()) {
        blocks.push(...emitApi(namespacePath(qualified, name), node.children.get(name)!, skipped));
    }
    const method = METHOD_NAMESPACES.has(qualified);
    const lines = [`interface ${typeName(qualified)} {`];
    for (const card of [...node.constants].sort((a, b) => a.name.localeCompare(b.name))) {
        if (!ident(card.name) || RESERVED_PARAM.has(card.name) || card.name === "new") {
            skipped.push(card.qualified);
            continue;
        }
        lines.push(jsdoc(card));
        lines.push(`    readonly ${card.name}: unknown;`);
    }
    for (const card of [...node.functions].sort((a, b) => a.name.localeCompare(b.name))) {
        if (!ident(card.name) || (RESERVED_PARAM.has(card.name) && card.name !== "delete" && card.name !== "default" && card.name !== "new")) {
            skipped.push(card.qualified);
            continue;
        }
        lines.push(jsdoc(card).split("\n").map((line) => `    ${line}`).join("\n"));
        lines.push(`    ${memberSignature(card, method, typeName(qualified))}`);
    }
    for (const name of [...node.children.keys()].sort()) {
        if (!ident(name) || RESERVED_PARAM.has(name) || name === "new") {
            skipped.push(namespacePath(qualified, name));
            continue;
        }
        lines.push(`    ${name}: ${typeName(namespacePath(qualified, name))};`);
    }
    lines.push("}");
    blocks.push(lines.join("\n"));
    return blocks;
}

function available(card: ApiCard, build: string): boolean {
    if (!card.since) return false;
    return opNumber(card.since) <= opNumber(build) && opNumber(card.since) >= 0;
}

function signature(card: ApiCard): string {
    return JSON.stringify({
        qualified: card.qualified,
        params: card.params,
        returns: card.returns,
        constant: Boolean(card.constant),
        permissions: card.permissions,
    });
}

function renderRuntime(runtime: "client" | "server", cards: ApiCard[], build: string, skipped: string[]): string {
    const root = emptyTree();
    const globals: ApiCard[] = [];
    for (const card of cards) {
        if (card.namespace === "_G") globals.push(card);
        else insertCard(root, card, skipped);
    }
    const declared = new Set(globals.map((card) => card.name));
    const base = BASE_GLOBALS.filter((line) => {
        const match = line.match(/function ([A-Za-z0-9_]+)/);
        return match ? !declared.has(match[1]) : true;
    });
    const sourceLines = [
        `/**`,
        ` * OPEN//77 ${runtime} declarations for catalogue build ${build}.`,
        ` * Generated from the official Devkit index. Do not edit by hand.`,
        ` */`,
        `/// <reference path="./tstl-language-extensions.d.ts" />`,
        ``,
        `/** JSON-like table accepted by OPEN//77 natives. */`,
        `type Open77Table = Record<string, unknown>;`,
        `/** Callback passed to a native. \`this: void\` keeps TSTL from inserting a self argument. */`,
        `type Open77Callback = (this: void, ...args: unknown[]) => void;`,
        ``,
        `interface Vector3 {`,
        `    x: number;`,
        `    y: number;`,
        `    z: number;`,
        `}`,
        ``,
        ...base,
        ``,
    ];
    if (runtime === "server") {
        sourceLines.push(
            `/**`,
            ` * Authenticated player id while a server network handler runs.`,
            ` * The resource runtime assigns it from the connection. It is not a client-supplied argument.`,
            ` * Outside a network handler it is unset.`,
            ` */`,
            `declare const source: number | undefined;`,
            ``,
        );
    }
    const globalFns = globals.filter((card) => ident(card.name)).sort((a, b) => a.name.localeCompare(b.name));
    for (const card of globalFns) {
        if (!ident(card.name) || RESERVED_PARAM.has(card.name) || card.name === "new") {
            skipped.push(card.qualified);
            continue;
        }
        if (card.constant) {
            sourceLines.push(`${jsdoc(card)}\ndeclare const ${card.name}: unknown;`);
        } else {
            const body = emitFunction(card, false);
            const marker = "\nfunction ";
            const at = body.lastIndexOf(marker);
            sourceLines.push(at >= 0 ? `${body.slice(0, at)}\ndeclare function ${body.slice(at + marker.length)}` : body);
        }
        sourceLines.push("");
    }
    sourceLines.push(...emitTop(root, skipped));
    sourceLines.push("");
    return sourceLines.join("\n");
}

function emitTop(root: Tree, skipped: string[]): string[] {
    const lines: string[] = [];
    const names = [...root.children.keys()].sort((left, right) => {
        if (left === "WebUI") return -1;
        if (right === "WebUI") return 1;
        return left.localeCompare(right);
    });
    for (const name of names) {
        if (!ident(name) || RESERVED_PARAM.has(name)) {
            skipped.push(name);
            continue;
        }
        lines.push(...emitApi(name, root.children.get(name)!, skipped));
        lines.push("");
        lines.push(`declare const ${name}: ${typeName(name)};`);
        lines.push("");
    }
    return lines;
}

function catalogueEntries(cards: ApiCard[]): Record<string, { permissions: string[]; since: string | null }> {
    const entries: Record<string, { permissions: string[]; since: string | null }> = {};
    for (const card of cards) {
        entries[card.qualified] = { permissions: card.permissions, since: card.since };
    }
    return entries;
}

function writeApiIndex(build: string, client: ApiCard[], server: ApiCard[], omitted: ApiCard[]): void {
    const docs = path.join(__dirname, "..", "..", "..", "docs", "api");
    mkdirSync(docs, { recursive: true });
    const lines = [
        "# OPEN//77 native index",
        "",
        `Generated from catalogue **${build}**. Parameters, return values, permissions, and examples are in \`packages/types/generated/client.d.ts\` and \`packages/types/generated/server.d.ts\`.`,
        "",
        "| Runtime | Native | Since | Permissions |",
        "|---|---|---|---|",
    ];
    const cards = [...client, ...server].sort((left, right) => left.qualified.localeCompare(right.qualified) || left.runtime.localeCompare(right.runtime));
    for (const card of cards) {
        lines.push(`| ${card.runtime} | \`${card.qualified}\` | ${card.since ?? ""} | ${card.permissions.join(", ")} |`);
    }
    lines.push("");
    writeFileSync(path.join(docs, "natives.md"), lines.join("\n"), "utf8");
    const omittedLines = [
        "# Natives omitted from the declarations",
        "",
        `Catalogue **${build}**. These cards have no \`since\` build, or their \`since\` build is newer than the catalogue. They are not declared as available.`,
        "",
    ];
    for (const card of [...omitted].sort((left, right) => left.qualified.localeCompare(right.qualified))) {
        omittedLines.push(`- \`${card.qualified}\` (${card.runtime}) since ${card.since ?? "unknown"}`);
    }
    omittedLines.push("");
    writeFileSync(path.join(docs, "omitted.md"), omittedLines.join("\n"), "utf8");
}

function main(): void {
    let directory: string;
    try {
        directory = indexDirectory();
    } catch (error) {
        const cached = path.join(__dirname, "..", "generated", "client.d.ts");
        if (existsSync(cached)) {
            process.stderr.write(`${(error as Error).message}\nUsing the declarations already generated in packages/types/generated.\n`);
            return;
        }
        throw error;
    }
    const manifest = JSON.parse(readFileSync(path.join(directory, "manifest.json"), "utf8")) as IndexManifest;
    const cards = JSON.parse(readFileSync(path.join(directory, "cards.json"), "utf8")) as ApiCard[];
    const events = JSON.parse(readFileSync(path.join(directory, "events.json"), "utf8")) as EventsFile;
    const build = manifest.build;
    const usable = cards.filter((card) => available(card, build));
    const omitted = cards.length - usable.length;
    const client = usable.filter((card) => card.runtime === "client");
    const server = usable.filter((card) => card.runtime === "server");
    const skipped: string[] = [];
    const outDir = path.join(__dirname, "..", "generated");
    mkdirSync(outDir, { recursive: true });
    const extensions = createRequire(path.join(__dirname, "..", "..", "..", "package.json")).resolve("@typescript-to-lua/language-extensions/index.d.ts");
    copyFileSync(extensions, path.join(outDir, "tstl-language-extensions.d.ts"));
    writeFileSync(path.join(outDir, "client.d.ts"), renderRuntime("client", client, build, skipped), "utf8");
    writeFileSync(path.join(outDir, "server.d.ts"), renderRuntime("server", server, build, skipped), "utf8");

    const serverByQualified = new Map(server.map((card) => [card.qualified, card]));
    const shared = client.filter((card) => signature(card) === signature(serverByQualified.get(card.qualified) ?? card) && serverByQualified.has(card.qualified));
    writeFileSync(path.join(outDir, "shared.d.ts"), renderRuntime("client", shared, build, skipped).replace("client declarations", "shared declarations (identical client and server cards)"), "utf8");

    const reserved = [...new Set((events.reservedPrefixes ?? []).map((entry) => entry.prefix))].sort();
    const catalogue = {
        build,
        omittedUnavailable: omitted,
        skipped,
        reservedPrefixes: reserved,
        counts: { client: client.length, server: server.length, shared: shared.length },
        client: catalogueEntries(client),
        server: catalogueEntries(server),
    };
    writeFileSync(path.join(outDir, "catalogue.json"), JSON.stringify(catalogue), "utf8");

    const sdkReserved = path.join(__dirname, "..", "..", "sdk", "src", "shared");
    mkdirSync(sdkReserved, { recursive: true });
    const reservedSource = [
        "/** Prefixes a resource must not raise. Generated from the Devkit events index. */",
        `export const RESERVED_EVENT_PREFIXES: string[] = ${JSON.stringify(reserved, null, 4)};`,
        "",
        "export function reservedEventProblem(name: string): string | undefined {",
        "    for (let index = 0; index < RESERVED_EVENT_PREFIXES.length; index += 1) {",
        "        const prefix = RESERVED_EVENT_PREFIXES[index];",
        "        if (prefix.length > 0 && name.substring(0, prefix.length) === prefix) {",
        "            return \"reserved_event_prefix\";",
        "        }",
        "    }",
        "    return undefined;",
        "}",
        "",
    ].join("\n");
    writeFileSync(path.join(sdkReserved, "reserved.ts"), reservedSource, "utf8");
    writeApiIndex(build, client, server, cards.filter((card) => !available(card, build)));
    process.stdout.write(`generated OPEN//77 ${build}: client ${client.length}, server ${server.length}, shared ${shared.length}, omitted ${omitted}\n`);
}

main();
