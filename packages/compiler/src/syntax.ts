import ts from "typescript";

const BANNED_IDENTIFIERS = new Set(["Promise", "Map", "Set", "WeakMap", "WeakSet", "console", "process", "Buffer", "fetch", "setTimeout", "setInterval", "require"]);
const NODE_SPECIFIERS = /^(node:|fs$|path$|http$|https$|os$|child_process$|net$|crypto$|buffer$|module$|mysql2|pg$|ioredis|fastify|zod$|ws$|@fastify\/)/;
const SPECIFIER = /(?:from|require|import)\s*(?:\(\s*)?["']([^"']+)["']/g;

export function specifiersInText(text: string): string[] {
    return [...text.matchAll(SPECIFIER)].map((match) => match[1]);
}

export function findSpecifierProblems(fileName: string, specifier: string, surface: "webui" | "node"): string | undefined {
    if (surface === "webui" && (NODE_SPECIFIERS.test(specifier) || specifier.includes("@open77-ts/node") || specifier.includes("@open77-ts/server") || specifier.includes("@open77/sdk/"))) {
        return `${fileName}: WebUI cannot import '${specifier}'`;
    }
    if (surface === "node" && (specifier.includes("@open77-ts/client") || specifier.includes("@open77-ts/server") || specifier.includes("@open77-ts/webui") || specifier.includes("@open77/sdk/") || specifier.includes("../client") || specifier.includes("../server") || specifier.includes("../webui"))) {
        return `${fileName}: Node companion cannot import '${specifier}'`;
    }
    return undefined;
}

export function findUnsupported(file: ts.SourceFile, runtime: "client" | "server"): string[] {
    const problems: string[] = [];
    const report = (node: ts.Node, message: string) => {
        const position = file.getLineAndCharacterOfPosition(node.getStart(file));
        problems.push(`${file.fileName}:${position.line + 1}:${position.character + 1}: ${message}`);
    };
    const reportGameplaySpecifier = (specifier: string, side: "client" | "server", node: ts.Node): void => {
        if (specifier.startsWith(".")) return;
        const ownSdk = specifier === `@open77/sdk/${side}` || specifier === `@open77-ts/${side}`;
        const sharedSdk = specifier === "@open77/sdk/shared" || specifier === "@open77-ts/shared";
        const bridge = side === "server" && specifier === "@open77-ts/server/bridge";
        if (ownSdk || sharedSdk || bridge) return;
        if (NODE_SPECIFIERS.test(specifier)) {
            report(node, `Node.js module '${specifier}' cannot run inside OPEN//77`);
            return;
        }
        if (specifier.includes("@open77-ts/node") || specifier.includes("@open77-ts/webui")) {
            report(node, `module '${specifier}' cannot be compiled into Lua`);
            return;
        }
        if (side === "client" && (specifier.includes("@open77-ts/shared/protocol") || specifier.includes("shared/src/protocol") || specifier.includes("shared/src/sha256"))) {
            report(node, `module '${specifier}' cannot be compiled into client Lua`);
            return;
        }
        if (side === "client" && (specifier.includes("@open77/sdk/server") || specifier.includes("@open77-ts/server"))) {
            report(node, "server SDK imported from a client script");
            return;
        }
        if (side === "server" && (specifier.includes("@open77/sdk/client") || specifier.includes("@open77-ts/client") || specifier.includes("@open77-ts/webui"))) {
            report(node, "client or WebUI SDK imported from a server script");
            return;
        }
        report(node, `module '${specifier}' cannot run inside the OPEN//77 sandbox. Install it for the Node companion and import it from src/backend. The server sandbox has no require.`);
    };
    const visit = (node: ts.Node): void => {
        if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
            report(node, "classes compile to setmetatable, which the OPEN//77 client sandbox removes");
        }
        const asyncFunction = (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isMethodDeclaration(node))
            && node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword);
        if (node.kind === ts.SyntaxKind.AwaitExpression || asyncFunction) {
            report(node, "async/await is not an OPEN//77 scheduler. Use CreateThread and Wait");
        }
        if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
            report(node, "dynamic import() cannot run inside the OPEN//77 sandbox. Load an npm package from src/backend.");
        }
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "require") {
            const specifier = node.arguments[0] && ts.isStringLiteral(node.arguments[0]) ? node.arguments[0].text : "a module";
            report(node, `require('${specifier}') is Node's loader, and the OPEN//77 sandbox does not run it. Put rethinkdb, chalk, and other packages in src/backend. On the client, call loadModule("modules.name") for a Lua file.`);
        }
        if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
            reportGameplaySpecifier(node.moduleReference.expression.text, runtime, node);
        }
        if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
            reportGameplaySpecifier(node.moduleSpecifier.text, runtime, node);
        }
        if (ts.isIdentifier(node) && node.parent && BANNED_IDENTIFIERS.has(node.text)) {
            const parent = node.parent;
            const callCallee = ts.isCallExpression(parent) && parent.expression === node;
            const propertyName = ts.isPropertyAccessExpression(parent) && parent.name === node;
            const qualifiedName = ts.isQualifiedName(parent) && parent.right === node;
            if (!callCallee && !propertyName && !qualifiedName) report(node, `'${node.text}' is not available in an OPEN//77 gameplay script`);
        }
        ts.forEachChild(node, visit);
    };
    visit(file);
    return problems;
}
