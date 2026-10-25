export function hardenBundle(lua: string, note: string): string {
    const withoutGlobal = lua.replace("local ____originalRequire = require", "local ____originalRequire = nil");
    const hardened = withoutGlobal.replace(
        /if ____originalRequire then\s*return ____originalRequire\(file\)\s*else\s*error\("module '" \.\. file \.\. "' not found"\)\s*end/s,
        "if false then\n            local ____bundleOnly = nil\n        else\n            error(\"module '\" .. file .. \"' is not in this bundle\")\n        end",
    );
    const lines = hardened.split(/\r?\n/);
    if (lines.length > 0 && lines[0].startsWith("--")) lines[0] = `-- [OPEN77-TS] ${note}`;
    else lines.unshift(`-- [OPEN77-TS] ${note}`);
    return lines.join("\n");
}
