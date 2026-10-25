import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import type { ResourceConfig } from "./config";

function quote(value: string): string {
    return `"${value.replace(/\\/g, "/").replace(/"/g, "\\\"")}"`;
}

function listFiles(directory: string, prefix: string): string[] {
    if (!statExists(directory)) return [];
    const found: string[] = [];
    for (const entry of readdirSync(directory)) {
        const absolute = path.join(directory, entry);
        const relative = `${prefix}/${entry}`.replace(/\\/g, "/");
        const info = statSync(absolute);
        if (info.isDirectory()) found.push(...listFiles(absolute, relative));
        else found.push(relative);
    }
    return found.sort();
}

function statExists(directory: string): boolean {
    try {
        return statSync(directory).isDirectory();
    } catch {
        return false;
    }
}

export function renderManifest(config: ResourceConfig, permissions: string[], catalogueBuild: string, resourceDir: string): string {
    const lines = [
        `-- [OPEN77-TS] generated for catalogue ${catalogueBuild}`,
        `resource ${quote(config.name)}`,
        `version ${quote(config.version)}`,
        `auto_start ${config.autoStart ? "true" : "false"}`,
        "",
    ];
    if (config.targets.includes("open77-client")) lines.push(`client_script ${quote("dist/client/main.lua")}`);
    if (config.targets.includes("open77-server")) lines.push(`server_script ${quote("dist/server/main.lua")}`);
    if (config.dependencies.length > 0) {
        lines.push("");
        for (const dependency of [...config.dependencies].sort()) lines.push(`dependency ${quote(dependency)}`);
    }
    const grants = [...new Set(permissions)].sort();
    if (grants.length > 0) {
        lines.push("");
        lines.push("permissions {");
        for (const permission of grants) lines.push(`    ${quote(permission)},`);
        lines.push("}");
    }
    const extraFiles = [
        ...listFiles(path.join(resourceDir, "files"), "files"),
        ...listFiles(path.join(resourceDir, "modules"), "modules"),
    ].filter((file) => !file.endsWith(".map"));
    if (extraFiles.length > 0) {
        lines.push("");
        for (const file of extraFiles) lines.push(`file ${quote(file)}`);
    }
    const webDir = path.join(resourceDir, "web");
    const webFiles = listFiles(webDir, "web").filter((file) => !file.endsWith(".map"));
    if (webFiles.length > 0) {
        lines.push("");
        for (const file of webFiles) lines.push(`web_file ${quote(file)}`);
    }
    lines.push("");
    return lines.join("\n");
}
