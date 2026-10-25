import { readFileSync } from "node:fs";
import path from "node:path";

/** Resolves `requestPath` inside `root`. A path that escapes the root is refused. */
export function safePath(root: string, requestPath: string): string | undefined {
    if (requestPath.length === 0 || requestPath.length > 180) return undefined;
    if (requestPath.includes("\0")) return undefined;
    const base = path.resolve(root);
    const resolved = path.resolve(base, requestPath);
    const relative = path.relative(base, resolved);
    if (relative.startsWith("..") || path.isAbsolute(relative)) return undefined;
    return resolved;
}

export function readWithin(root: string, requestPath: string, maxBytes = 16_384): string {
    const file = safePath(root, requestPath);
    if (file === undefined) throw new Error("path_rejected");
    const data = readFileSync(file);
    if (data.length > maxBytes) throw new Error("file_too_large");
    return data.toString("utf8");
}
