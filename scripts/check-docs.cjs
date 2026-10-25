const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const problems = [];

function filesIn(directory) {
    const found = [];
    for (const entry of fs.readdirSync(directory)) {
        const absolute = path.join(directory, entry);
        if (fs.statSync(absolute).isDirectory()) found.push(...filesIn(absolute));
        else if (absolute.endsWith(".md")) found.push(absolute);
    }
    return found;
}

function check(file) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
        const raw = match[1].split(/\s+/)[0];
        if (!raw || raw.startsWith("http:") || raw.startsWith("https:") || raw.startsWith("mailto:") || raw.startsWith("#")) continue;
        const target = path.resolve(path.dirname(file), raw.split("#")[0]);
        if (!fs.existsSync(target)) problems.push(`${path.relative(root, file)} -> ${raw}`);
    }
}

for (const file of [...filesIn(path.join(root, "docs")), path.join(root, "README.md")]) check(file);
if (problems.length > 0) {
    process.stderr.write(problems.join("\n") + "\n");
    process.exit(1);
}
process.stdout.write("docs: links ok\n");
