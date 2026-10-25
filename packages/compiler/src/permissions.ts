import type { CatalogueFile } from "./config";

const IGNORE = new Set([
    "assert", "error", "getmetatable", "ipairs", "next", "pairs", "pcall", "rawequal", "rawget",
    "rawlen", "rawset", "require", "select", "setmetatable", "tonumber", "tostring", "type", "xpcall",
]);

export interface ScanResult {
    permissions: string[];
    unknown: string[];
    wrongSide: string[];
}

/** Drops comments and string literals so a mention of a native is not treated as a call. */
export function stripLuaLiterals(source: string): string {
    let out = "";
    let index = 0;
    while (index < source.length) {
        const longOpen = source.slice(index).match(/^\[(=*)\[/);
        if (longOpen && (index === 0 || source[index - 1] !== "-")) {
            const close = "]" + longOpen[1] + "]";
            const end = source.indexOf(close, index + longOpen[0].length);
            index = end < 0 ? source.length : end + close.length;
            out += " ";
            continue;
        }
        if (source.startsWith("--", index)) {
            if (source.startsWith("--[[", index) || source.slice(index).startsWith("--[=")) {
                const marker = source.slice(index + 2).match(/^\[(=*)\[/);
                if (marker) {
                    const close = "]" + marker[1] + "]";
                    const end = source.indexOf(close, index + 2 + marker[0].length);
                    index = end < 0 ? source.length : end + close.length;
                    out += " ";
                    continue;
                }
            }
            const end = source.indexOf("\n", index);
            index = end < 0 ? source.length : end;
            out += " ";
            continue;
        }
        const quote = source[index];
        if (quote === "\"" || quote === "'") {
            index += 1;
            while (index < source.length) {
                if (source[index] === "\\") {
                    index += 2;
                    continue;
                }
                if (source[index] === quote) {
                    index += 1;
                    break;
                }
                if (source[index] === "\n") break;
                index += 1;
            }
            out += quote === "\"" ? "\"\"" : "''";
            continue;
        }
        out += source[index];
        index += 1;
    }
    return out;
}

export function scanLua(source: string, runtime: "client" | "server", catalogue: CatalogueFile): ScanResult {
    const code = stripLuaLiterals(source);
    const own = catalogue[runtime];
    const other = catalogue[runtime === "client" ? "server" : "client"];
    const used = new Set<string>();
    const unknown: string[] = [];
    const wrongSide: string[] = [];
    const namespaced = /\b((?:Open77|Citizen|json|WebUI)(?:\.[A-Za-z_][A-Za-z0-9_]*)+)\s*\(/g;
    for (const match of code.matchAll(namespaced)) {
        const name = match[1];
        note(name, own, other, used, unknown, wrongSide);
    }
    const calls = /\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
    for (const match of code.matchAll(calls)) {
        const name = match[1];
        const index = match.index ?? 0;
        const previous = index > 0 ? code[index - 1] : "";
        if (previous === "." || previous === ":") continue;
        if (IGNORE.has(name)) continue;
        if (!own[name] && !other[name]) continue;
        note(name, own, other, used, unknown, wrongSide);
    }
    return {
        permissions: [...used].sort(),
        unknown,
        wrongSide,
    };
}

function note(
    name: string,
    own: CatalogueFile["client"],
    other: CatalogueFile["client"],
    used: Set<string>,
    unknown: string[],
    wrongSide: string[],
): void {
    const card = own[name];
    if (card) {
        for (const permission of card.permissions) used.add(permission);
        return;
    }
    if (other[name]) wrongSide.push(name);
    else unknown.push(name);
}
