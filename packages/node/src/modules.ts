import { createRequire } from "node:module";
import path from "node:path";

const GAME_MODULES = ["@open77-ts/client", "@open77-ts/server", "@open77-ts/webui", "@open77/sdk/"];

/**
 * Node's `require`, rooted at a resource directory.
 * Package names resolve from that resource's `node_modules`.
 * Relative ids must stay inside the resource. Gameplay SDK packages are refused.
 * The Lua sandbox never sees this function.
 */
export function createResourceRequire(resourceDir: string): NodeRequire {
    const root = path.resolve(resourceDir);
    const req = createRequire(path.join(root, "package.json"));
    const sandboxed = ((id: string) => {
        assertLoadable(root, id, req);
        return req(id);
    }) as NodeRequire;
    sandboxed.resolve = ((id: string, options?: { paths?: string[] }) => {
        assertLoadable(root, id, req);
        return req.resolve(id, options);
    }) as NodeRequire["resolve"];
    sandboxed.cache = req.cache;
    sandboxed.main = req.main;
    return sandboxed;
}

function assertLoadable(root: string, id: string, req: NodeRequire): void {
    if (typeof id !== "string" || id.length === 0 || id.includes("\0") || path.isAbsolute(id)) {
        throw new Error("module_rejected");
    }
    if (GAME_MODULES.some((prefix) => id === prefix || id.startsWith(`${prefix}`))) {
        throw new Error(`module_rejected:${id}`);
    }
    if (!id.startsWith(".")) return;
    const resolved = req.resolve(id);
    const relative = path.relative(root, resolved);
    if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("module_rejected");
}
