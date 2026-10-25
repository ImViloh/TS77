/**
 * Structural checks for the OPEN//77 event codec.
 * The codec accepts nil, booleans, finite numbers, strings, and acyclic tables
 * with string or integer keys. The 48 KiB envelope is enforced again with the
 * runtime JSON encoder before a packet is sent.
 */
export const NET_MAX_DEPTH = 16;
export const NET_MAX_ARGS = 32;
export const NET_MAX_BYTES = 48 * 1024;

export function netProblem(value: unknown, kindOf: (value: unknown) => string, seen: object[] = [], depth = 0): string | undefined {
    if (depth > NET_MAX_DEPTH) return "network_payload_too_deep";
    const kind = kindOf(value);
    if (kind === "nil" || kind === "boolean" || kind === "string") return undefined;
    if (kind === "number") {
        const numeric = value as number;
        if (numeric !== numeric || numeric > 1e308 || numeric < -1e308) return "network_payload_not_serializable";
        return undefined;
    }
    if (kind !== "table") return "network_payload_not_serializable";
    const table = value as object;
    for (let index = 0; index < seen.length; index += 1) {
        if (seen[index] === table) return "network_payload_not_serializable";
    }
    seen.push(table);
    const record = table as Record<string, unknown>;
    for (const key in record) {
        const keyKind = kindOf(key);
        if (keyKind !== "string" && keyKind !== "number") return "network_payload_not_serializable";
        const problem = netProblem(record[key], kindOf, seen, depth + 1);
        if (problem !== undefined) return problem;
    }
    return undefined;
}

/** JavaScript stand-in used by Node tests. The Lua wrappers pass the real `type` global. */
export function jsKind(value: unknown): string {
    if (value === undefined || value === null) return "nil";
    if (typeof value === "boolean") return "boolean";
    if (typeof value === "number") return "number";
    if (typeof value === "string") return "string";
    if (typeof value === "function") return "function";
    if (typeof value === "object") return "table";
    return "userdata";
}

export function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== undefined && value !== null;
}

export function isShortString(value: unknown, max: number): value is string {
    return typeof value === "string" && value.length > 0 && value.length <= max;
}
