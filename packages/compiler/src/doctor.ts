import { existsSync } from "node:fs";
import path from "node:path";
import { cataloguePath, loadCatalogue, loadConfig, resolveToolchain, RESOURCE_NAME } from "./config";

export interface DoctorLine {
    level: "ok" | "warn" | "fail";
    text: string;
}

export function doctor(resourceDir?: string): DoctorLine[] {
    const lines: DoctorLine[] = [];
    const major = Number(process.versions.node.split(".")[0]);
    lines.push(major >= 20 ? { level: "ok", text: `Node ${process.versions.node}` } : { level: "fail", text: `Node ${process.versions.node} is older than 20` });
    if (major < 22) lines.push({ level: "warn", text: "The Node companion targets Node.js 22 or newer." });
    const tstl = resolveToolchain("typescript-to-lua/package.json");
    lines.push(existsSync(tstl) ? { level: "ok", text: "typescript-to-lua is installed" } : { level: "fail", text: "typescript-to-lua is not installed" });
    if (!existsSync(cataloguePath())) {
        lines.push({ level: "fail", text: "API catalogue is missing. Run npm run generate." });
        return lines;
    }
    const catalogue = loadCatalogue();
    lines.push({ level: "ok", text: `declarations are for OPEN//77 ${catalogue.build} (${catalogue.counts.client} client, ${catalogue.counts.server} server)` });
    lines.push({ level: "warn", text: "The dedicated server binary may be newer than this catalogue. Natives are declared only for the catalogue build." });
    if (!resourceDir) return lines;
    const root = path.resolve(resourceDir);
    const configFile = path.join(root, "open77-ts.json");
    if (!existsSync(configFile)) {
        lines.push({ level: "fail", text: "open77-ts.json was not found" });
        return lines;
    }
    try {
        const config = loadConfig(root);
        lines.push(RESOURCE_NAME.test(config.name) ? { level: "ok", text: `resource name ${config.name}` } : { level: "fail", text: `invalid resource name ${config.name}` });
        lines.push(path.basename(root) === config.name ? { level: "ok", text: "directory name matches the resource" } : { level: "fail", text: "directory name does not match the resource" });
        lines.push(existsSync(path.join(root, config.client)) ? { level: "ok", text: `client entry ${config.client}` } : { level: "fail", text: `missing client entry ${config.client}` });
        lines.push(existsSync(path.join(root, config.server)) ? { level: "ok", text: `server entry ${config.server}` } : { level: "fail", text: `missing server entry ${config.server}` });
        if (config.backend) {
            lines.push(existsSync(path.join(root, config.backend)) ? { level: "ok", text: `backend entry ${config.backend}` } : { level: "fail", text: `missing backend entry ${config.backend}` });
        }
        lines.push({ level: "ok", text: `targets ${config.targets.join(", ")}` });
        if (config.serverResourcesDir) {
            lines.push(existsSync(config.serverResourcesDir) ? { level: "ok", text: `server resources ${config.serverResourcesDir}` } : { level: "warn", text: `server resources directory does not exist: ${config.serverResourcesDir}` });
        }
    } catch (error) {
        lines.push({ level: "fail", text: (error as Error).message });
    }
    return lines;
}
