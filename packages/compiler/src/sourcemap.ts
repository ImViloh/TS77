import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { SourceMapConsumer } from "source-map";

export interface MappedFrame {
    source?: string;
    line?: number;
    column?: number;
    name?: string;
}

export async function mapLuaPosition(luaFile: string, line: number, column = 0): Promise<MappedFrame | undefined> {
    const mapFile = `${luaFile}.map`;
    if (!existsSync(mapFile)) return undefined;
    const consumer = await new SourceMapConsumer(JSON.parse(readFileSync(mapFile, "utf8")) as never);
    try {
        const columns = [column, 0, 1, 2, 4, 8, 16];
        for (const candidate of columns) {
            const position = consumer.originalPositionFor({ line, column: candidate });
            if (!position.source || !position.line) continue;
            return {
                source: resolveSource(position.source, luaFile),
                line: position.line,
                column: position.column ?? 0,
                name: position.name ?? undefined,
            };
        }
        return undefined;
    } finally {
        consumer.destroy();
    }
}

export function resourceNameFromLua(luaFile: string): string {
    return path.basename(path.dirname(path.dirname(luaFile)));
}

function resolveSource(source: string, luaFile: string): string {
    const normalized = source.replace(/\\/g, "/");
    const packaged = normalized.match(/packages\/(?:sdk|shared)\/src\/.+$/);
    if (packaged) return packaged[0];
    if (normalized.includes("/")) return normalized;
    const resourceDir = path.resolve(path.dirname(luaFile), "..", "..");
    const matches = findFiles(path.join(resourceDir, "src")).filter((file) => path.basename(file) === normalized);
    if (matches.length === 1) return path.relative(resourceDir, matches[0]).replace(/\\/g, "/");
    return normalized;
}

function findFiles(directory: string): string[] {
    if (!existsSync(directory)) return [];
    const found: string[] = [];
    for (const entry of readdirSync(directory)) {
        const absolute = path.join(directory, entry);
        if (statSync(absolute).isDirectory()) found.push(...findFiles(absolute));
        else found.push(absolute);
    }
    return found;
}
