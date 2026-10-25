const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function commentText(buf) {
    const prose = [];
    let failure = "";
    let returns = "";
    for (const line of buf) {
        if (line.startsWith("@failure")) failure = line.slice("@failure".length).trim();
        else if (line.startsWith("@open77Return")) returns = line.slice("@open77Return".length).trim();
        else if (line.startsWith("@")) continue;
        else if (line) prose.push(line);
    }
    return {
        d: prose[0] || "",
        x: prose.slice(1).join(" ").slice(0, 900),
        f: failure.slice(0, 400),
        o: returns.slice(0, 400),
    };
}

function indexDeclarations(file) {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    const map = new Map();
    let depth = 0;
    let iface = null;
    let pending = null;
    let collecting = false;
    let buf = [];
    for (const raw of lines) {
        const line = raw.trim();
        if (!collecting && line.startsWith("/**")) collecting = true;
        if (collecting) {
            const content = line.replace(/^\/\*\*\s?/, "").replace(/^\*\s?/, "").replace(/\*\/\s*$/, "").trim();
            if (content) buf.push(content);
            if (line.endsWith("*/")) {
                collecting = false;
                pending = commentText(buf);
                buf = [];
            }
            continue;
        }
        if (line.startsWith("type ") || line.startsWith("interface ")) pending = null;
        const opened = line.match(/^interface ([A-Za-z0-9_]+)/);
        if (opened && depth === 0) iface = opened[1];
        if (pending && depth === 0) {
            const declared = line.match(/^declare function ([A-Za-z0-9_]+)/) || line.match(/^declare const ([A-Za-z0-9_]+)/);
            if (declared) {
                map.set(declared[1], { ...pending, g: line.replace(/;$/, "") });
                pending = null;
            }
        } else if (pending && iface && depth >= 1) {
            const member = line.match(/^(?:readonly\s+)?([A-Za-z0-9_]+)\s*[(:]/);
            if (member) {
                map.set(`${iface}.${member[1]}`, { ...pending, g: line.replace(/;$/, "") });
                pending = null;
            }
        }
        depth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        if (depth <= 0) {
            depth = 0;
            iface = null;
        }
    }
    return map;
}

const reservedAwait = {
    "client|Open77.Promise.await": {
        d: "Waits for a promise to settle.",
        x: "Only usable inside a CreateThread. TypeScript cannot declare the name await, so the generated declarations omit this method. Citizen.Await(promise) is the same call and is declared. In Lua the catalogue name is the colon call promise:await().",
        f: "await_requires_scheduler_coroutine, promise_cancelled",
        o: "resolved value, or nil; rejection reason",
        g: "Citizen.Await(promise) — same as promise:await()",
    },
    "server|Open77.Promise.await": {
        d: "Waits for the promise to settle and returns its values.",
        x: "Needs a managed coroutine. Outside one it answers nil, await_requires_scheduler_coroutine instead of blocking the server tick. TypeScript cannot declare the name await. Citizen.Await(promise) is the declared alias. In Lua the catalogue name is promise:await().",
        f: "await_requires_scheduler_coroutine",
        o: "the resolved values, or nil, reason",
        g: "Citizen.Await(promise) — same as promise:await()",
    },
    "server|Open77.EventVerdict.await": {
        d: "Waits for the event to have been offered to every resource, then answers the verdict.",
        x: "Settles one tick after publication. Needs a managed coroutine and answers false, await_requires_scheduler_coroutine outside one. TypeScript cannot declare the name await, so this colon call is not in the generated declarations. canceled() and status() are declared and do not yield.",
        f: "await_requires_scheduler_coroutine, pending, settled, unknown",
        o: "true when a handler cancelled, false otherwise",
        g: "verdict:await() — colon call, no arguments",
    },
};

function declarationKey(name) {
    const dot = name.lastIndexOf(".");
    if (dot < 0) return name;
    const owner = name.slice(0, dot).split(".").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
    return `${owner}Api.${name.slice(dot + 1)}`;
}

function parseOmitted(file) {
    const rows = [];
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
        const match = line.match(/^- `([^`]+)` \((client|server)\) since (.+)$/);
        if (match) rows.push({ n: match[1], r: match[2], s: match[3] });
    }
    return rows;
}

const clientSummaries = indexDeclarations(path.join(root, "packages", "types", "generated", "client.d.ts"));
const serverSummaries = indexDeclarations(path.join(root, "packages", "types", "generated", "server.d.ts"));
const natives = [];
for (const line of fs.readFileSync(path.join(root, "docs", "api", "natives.md"), "utf8").split("\n")) {
    const match = line.match(/^\| (client|server) \| `([^`]+)` \| ([^|]*) \| ([^|]*) \|$/);
    if (!match) continue;
    const qualified = match[2];
    const extra = (match[1] === "client" ? clientSummaries : serverSummaries).get(declarationKey(qualified))
        || reservedAwait[`${match[1]}|${qualified}`];
    natives.push({
        r: match[1],
        n: match[2],
        s: match[3].trim(),
        p: match[4].trim(),
        d: extra ? extra.d : "",
        x: extra ? extra.x : "",
        f: extra ? extra.f : "",
        o: extra ? extra.o : "",
        g: extra ? extra.g : "",
    });
}
const omitted = parseOmitted(path.join(root, "docs", "api", "omitted.md"));
const payload = JSON.stringify({ natives, omitted }).replace(/</g, "\\u003c");

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TS77 — TypeScript plugins for OPEN//77</title>
<style>
:root {
  color-scheme: dark;
  --bg: #07090d;
  --ink: #e7ebf2;
  --muted: #8e98a8;
  --faint: #6b7484;
  --line: #232a36;
  --panel: #0e1218;
  --accent: #ff5b8a;
  --accent-ink: #2a0c16;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  font: 16.5px/1.7 "Segoe UI", "Helvetica Neue", sans-serif;
  background:
    radial-gradient(880px 240px at 50% -80px, rgba(255, 91, 138, 0.22), transparent 70%),
    var(--bg);
}
.skip {
  position: absolute;
  left: 12px;
  top: -40px;
  background: var(--accent);
  color: var(--accent-ink);
  padding: 6px 10px;
  z-index: 9;
}
.skip:focus { top: 8px; }
a { color: var(--accent); }
a:hover { color: #fff; }
code, pre { font-family: Consolas, "Cascadia Mono", monospace; }
code {
  color: var(--accent);
  background: rgba(255, 91, 138, 0.12);
  padding: 0.08em 0.38em;
  border-radius: 4px;
}
pre {
  background: #0b0e14;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 18px 20px;
  overflow: auto;
  white-space: pre-wrap;
  color: #d5dbe6;
  line-height: 1.6;
}
.bar {
  position: sticky;
  top: 0;
  z-index: 8;
  height: 64px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 0 28px;
  background: rgba(7, 9, 13, 0.92);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
}
.word {
  justify-self: start;
  color: #fff;
  text-decoration: none;
  font-weight: 750;
  letter-spacing: 0.16em;
  font-size: 1.05rem;
}
.word span { color: var(--accent); }
.bar-nav { display: flex; gap: 26px; }
.bar-nav a {
  color: #c5cad3;
  text-decoration: none;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.bar-nav a:hover { color: #fff; }
.build { justify-self: end; color: var(--faint); font-size: 0.78rem; }
.layout {
  width: min(1560px, calc(100% - 56px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr) 168px;
  gap: 48px;
  padding: 0 0 88px;
}
.side, .rail {
  position: sticky;
  top: 64px;
  align-self: start;
  max-height: calc(100vh - 64px);
  overflow: auto;
  padding: 28px 0 40px;
}
.group {
  margin: 22px 0 6px;
  color: var(--faint);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.side a, .rail a {
  display: block;
  color: #b7c0cc;
  text-decoration: none;
  padding: 4px 0;
  font-size: 0.92rem;
}
.side a:hover, .rail a:hover, .side a.on, .rail a.on { color: var(--accent); }
.rail p {
  margin: 0 0 10px;
  color: var(--faint);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
main { padding: 8px 0 48px; min-width: 0; }
.hero {
  padding: 46px 0 8px;
  margin: 0;
  background: none;
  border: 0;
}
.crumb {
  margin: 0 0 18px;
  color: var(--faint);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.crumb a { color: var(--accent); text-decoration: none; }
.hero h1 {
  margin: 0 0 18px;
  color: #fff;
  font-size: clamp(2.5rem, 4vw, 3.6rem);
  line-height: 0.96;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  font-weight: 750;
}
.hero > p { max-width: 68ch; color: #c5cad3; }
.hero h1 span { color: #fff; }
.pipeline { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin: 28px 0 4px; }
.pipe {
  border: 0;
  background: transparent;
  color: #c5cad3;
  padding: 0;
  letter-spacing: 0.02em;
  font-family: Consolas, monospace;
  font-size: 0.92rem;
}
.pipe.hot { color: var(--accent); }
.arrow { color: #4d5666; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 28px; }
.grid.four { grid-template-columns: 1fr 1fr; }
.card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 18px 20px;
}
.card p:last-child { margin: 0; color: #c5cad3; }
.idx {
  margin: 0 0 6px;
  color: var(--accent);
  font-family: Consolas, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
}
.card h3 { margin: 0 0 6px; color: #fff; }
section { padding-top: 64px; }
h2 {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 14px;
  color: #fff;
  font-size: 1.35rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 720;
}
h2::before { content: "//"; color: var(--accent); letter-spacing: 0; }
h3 { color: #fff; margin-top: 1.6rem; font-size: 1.05rem; }
table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
th, td {
  border-bottom: 1px solid var(--line);
  text-align: left;
  padding: 10px 12px;
  vertical-align: top;
  overflow-wrap: anywhere;
}
th {
  color: var(--faint);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 650;
}
.note { color: var(--muted); }
.steps { counter-reset: step; padding: 0; list-style: none; }
.steps li {
  counter-increment: step;
  margin: 0;
  padding: 12px 8px 12px 46px;
  position: relative;
  border-bottom: 1px solid var(--line);
}
.steps li::before {
  content: counter(step, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 12px;
  color: var(--accent);
  font-family: Consolas, monospace;
}
.table-wrap { overflow: auto; border: 1px solid var(--line); border-radius: 10px; }
#api-tools, #omit-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
  position: sticky;
  top: 64px;
  z-index: 4;
  background: var(--bg);
  padding: 10px 0;
}
.api-row { cursor: pointer; }
.api-row:hover td { background: rgba(255, 91, 138, 0.08); }
.detail td { background: #0b0e14; color: var(--ink); }
.detail strong { color: var(--accent); }
.stamp {
  display: inline-block;
  border: 1px solid var(--accent);
  color: var(--accent);
  letter-spacing: 0.14em;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 0.72rem;
}
input[type="search"] {
  background: #0c1016;
  color: var(--ink);
  border: 1px solid #2c3442;
  border-radius: 8px;
  padding: 8px 12px;
  min-width: 240px;
}
button.chip {
  background: transparent;
  color: #c5cad3;
  border: 1px solid #2c3442;
  border-radius: 999px;
  padding: 7px 12px;
  cursor: pointer;
}
button.chip[aria-pressed="true"] { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
#api-count, #omit-count { color: var(--muted); align-self: center; }
.api-row td:first-child { color: var(--accent); }
#nav-toggle { position: absolute; opacity: 0; pointer-events: none; }
.menu {
  display: none;
  justify-self: end;
  border: 1px solid #2c3442;
  color: #fff;
  border-radius: 999px;
  padding: 6px 12px;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
}
footer { color: var(--muted); border-top: 1px solid var(--line); margin-top: 36px; padding-top: 16px; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media (max-width: 1180px) {
  .layout { width: min(100% - 40px, 1560px); grid-template-columns: 200px minmax(0, 1fr); gap: 36px; }
  .rail { display: none; }
}
@media (max-width: 800px) {
  .layout { display: block; padding: 0 16px 64px; }
  .menu { display: inline-block; }
  .bar { grid-template-columns: 1fr auto; }
  .bar-nav, .build { display: none; }
  .side { display: none; position: static; max-height: none; }
  #nav-toggle:checked ~ .layout .side { display: block; }
  .grid, .grid.four { grid-template-columns: 1fr; }
}
</style>
</head>
<body>
<a class="skip" href="#start">Skip to the guide</a>
<header class="bar">
  <a class="word" href="#start">TS<span>77</span></a>
  <nav class="bar-nav" aria-label="Primary">
    <a href="#start">Guide</a>
    <a href="#sdk">SDK</a>
    <a href="#api">Natives</a>
    <a href="#endpoints">Endpoints</a>
  </nav>
  <span class="build">2.50.0+op77.148</span>
  <label class="menu" for="nav-toggle">Menu</label>
</header>
<input id="nav-toggle" type="checkbox" aria-label="Open the section menu">
<div class="layout">
<nav class="side" aria-label="Guide sections">
  <p class="group">Start</p>
  <a href="#start">Start here</a>
  <a href="#path">What runs where</a>
  <a href="#install">Install</a>
  <a href="#first">First plugin</a>
  <p class="group">Write</p>
  <a href="#files">Files</a>
  <a href="#edit">Edit TypeScript</a>
  <a href="#commands">Commands</a>
  <a href="#runtimes">Client and server</a>
  <a href="#events">Events</a>
  <a href="#webui">React WebUI</a>
  <a href="#node">Node companion</a>
  <p class="group">Ship</p>
  <a href="#deploy">Deploy</a>
  <a href="#config">Configuration</a>
  <a href="#manifest">Manifest</a>
  <p class="group">Reference</p>
  <a href="#sdk">TS77 SDK</a>
  <a href="#api">Native API</a>
  <a href="#omitted">Omitted natives</a>
  <a href="#endpoints">HTTP endpoints</a>
  <a href="#trouble">Troubleshooting</a>
  <a href="#limits">Limits</a>
</nav>
<main>
<section class="hero" id="start">
  <p class="crumb"><a href="#start">Docs</a> / TypeScript / Plugins</p>
  <h1>Write plugins.<br><span>The city runs Lua.</span></h1>
  <p>TS77 is how you build an OPEN//77 multiplayer plugin in TypeScript. A plugin is a resource: a named folder the server starts, with code for the player's machine and code for the dedicated server. The game runs Lua 5.4. It does not run TypeScript, and a web page cannot call natives. TS77 compiles the client and the server, writes the <code>open77.lua</code> manifest, and leaves React and Node as themselves.</p>
  <div class="pipeline" aria-label="What TS77 compiles">
    <span class="pipe">src/*.ts</span>
    <span class="arrow">//</span>
    <span class="pipe hot">TS77</span>
    <span class="arrow">//</span>
    <span class="pipe">Lua 5.4</span>
    <span class="arrow">//</span>
    <span class="pipe hot">OPEN//77</span>
  </div>
  <div class="grid">
    <article class="card"><p class="idx">01 · FIRST HOUR</p><h3>A print statement</h3><p>Install Node, run four commands, and change one greeting. You do not write Lua or a manifest. Create writes <code>tsconfig.json</code> for the editor.</p></article>
    <article class="card"><p class="idx">02 · NEXT</p><h3>A real plugin</h3><p>The same project can grow a typed client/server event, a React page inside the game, and a Node process for npm packages such as RethinkDB.</p></article>
  </div>
</section>

<section id="path">
  <h2>What runs where</h2>
  <div class="grid four">
    <article class="card"><p class="idx">CLIENT LUA</p><h3>The player's PC</h3><p>Input, HUD, camera, and messages to the server. This code is on the player's machine. Do not put secrets here.</p></article>
    <article class="card"><p class="idx">SERVER LUA</p><h3>The authority</h3><p>Money, items, permissions, bans, and vehicles. If a player can gain it, the server decides it.</p></article>
    <article class="card"><p class="idx">REACT PAGE</p><h3>Chromium, not the game</h3><p><code>window.Open77</code> has four calls: ready, on, emit, invoke. The page cannot spawn a vehicle or read a file.</p></article>
    <article class="card"><p class="idx">NODE</p><h3>A separate process</h3><p>Databases and npm <code>require</code>. The server talks to it over signed HTTP. A basic plugin never starts it.</p></article>
  </div>
</section>

<section id="install">
  <h2>Install</h2>
  <p>You need Node.js 20 or newer. If a plugin has a Node companion, use Node.js 22 or newer for that process. You also need an OPEN//77 server if you want to deploy. Reading this page and compiling a plugin do not require the game to be open.</p>
  <ol class="steps">
    <li>Install Node.js from the official Node website. Open a terminal and run <code>node -v</code>. A number of 20 or higher is enough to start.</li>
    <li>TypeScript is a way to write JavaScript with declared types. TS77 installs it for you. You do not install TypeScriptToLua, and you do not write <code>tsconfig.json</code> yourself. <code>ts2077 create</code> writes it, and that is the file the editor reads.</li>
    <li>Create a plugin. The folder name and the resource name are the same slug: a lowercase letter, then letters, digits, or underscores, 3 to 64 characters. <code>my_plugin</code> is valid. <code>my-plugin</code> is not, because of the hyphen.</li>
  </ol>
  <pre>npx ts2077 create my_plugin --template basic --no-install
cd my_plugin
npm install
npm run dev</pre>
  <p><code>npx ts2077</code> downloads the package. It provides the <code>ts77</code> and <code>open77-ts</code> commands. <code>--no-install</code> skips an extra install during creation. <code>npm install</code> then installs the package into the plugin. <code>npm run dev</code> watches <code>src/</code> and rebuilds Lua when you save.</p>
  <p class="note"><code>npx ts2077</code> installs this package from the npm registry. The commands it provides are <code>ts77</code> and <code>open77-ts</code>.</p>
</section>

<section id="first">
  <h2>Your first plugin</h2>
  <p>In a terminal, <code>ts77 create</code> with no name asks four questions: the name, the template, an optional server folder, and whether to install dependencies. In a script, pass the flags so it does not wait.</p>
  <table>
    <tr><th>Template</th><th>Use it when</th></tr>
    <tr><td><code>basic</code></td><td>You want the smallest plugin. It prints a greeting when the resource starts. It has no network permission and no Node process.</td></tr>
    <tr><td><code>gameplay</code></td><td>You want a client and a server that exchange one typed event, <code>demo:ping</code>.</td></tr>
    <tr><td><code>webui</code></td><td>You want a React page inside the game's Chromium surface.</td></tr>
    <tr><td><code>fullstack</code></td><td>You want gameplay, React, and a Node companion. Only this template starts Node.</td></tr>
  </table>
  <p>Open the folder in Cursor or VS Code. <code>tsconfig.json</code> selects <code>tsconfig.client.json</code> or <code>tsconfig.server.json</code> for the file you have open. That is how <code>@open77/sdk/client</code> and the native declarations are found. Hover a native such as <code>GetCurrentResourceName</code>. The declaration shows the summary, the parameters, the permission, and the catalogue version. That text comes from the OPEN//77 Devkit index, not from a guess.</p>
  <pre>npm run build</pre>
  <p>Build writes <code>open77.lua</code>, <code>dist/client/main.lua</code>, and <code>dist/server/main.lua</code>. Leave those files alone. Change the TypeScript and build again.</p>
</section>

<section id="files">
  <h2>Where the files are</h2>
  <table>
    <tr><th>Path</th><th>What it is</th></tr>
    <tr><td><code>open77-ts.json</code></td><td>The resource name, version, entries, and permissions. The directory name must match <code>name</code>.</td></tr>
    <tr><td><code>package.json</code></td><td>Scripts: <code>dev</code>, <code>build</code>, <code>deploy</code>, <code>validate</code>.</td></tr>
    <tr><td><code>src/client</code></td><td>TypeScript that becomes client Lua. This runs on each player's machine.</td></tr>
    <tr><td><code>src/server</code></td><td>TypeScript that becomes server Lua. This runs on the dedicated server and is the authority for money, items, permissions, and vehicles.</td></tr>
    <tr><td><code>src/shared</code></td><td>TypeScript copied into each side that imports it. Do not put secrets here. The client copy is delivered to players.</td></tr>
    <tr><td><code>src/modules</code></td><td>Optional extra client Lua files. <code>src/modules/tools.ts</code> becomes <code>modules/tools.lua</code>. Load it with <code>loadModule("modules.tools")</code>.</td></tr>
    <tr><td><code>src/backend</code></td><td>Optional Node program. It is not loaded into the Lua sandbox.</td></tr>
    <tr><td><code>src/webui</code> or <code>ui/</code></td><td>Optional React page. It stays JavaScript.</td></tr>
    <tr><td><code>ts77.config.json</code></td><td>Optional overlay. It changes the build in memory and does not rewrite <code>open77-ts.json</code>.</td></tr>
  </table>
</section>

<section id="edit">
  <h2>Edit the greeting</h2>
  <p>The basic template already does this. <code>src/shared/greeting.ts</code> returns a string. Both sides print it when the resource starts.</p>
  <pre>export function greet(name: string): string {
    return "Hello from " + name;
}</pre>
  <p>Client:</p>
  <pre>import { onClientResourceStart } from "@open77/sdk/client";
import { greet } from "../shared/greeting";

onClientResourceStart(() => {
    print(greet(GetCurrentResourceName()));
});</pre>
  <p>Server:</p>
  <pre>import { onResourceStart } from "@open77/sdk/server";
import { greet } from "../shared/greeting";

onResourceStart(() => {
    print(greet(GetCurrentResourceName()));
});</pre>
  <p><code>print</code> writes to that side's log. <code>GetCurrentResourceName</code> is a real native. Save the file while <code>npm run dev</code> is running and the Lua is rebuilt.</p>
  <p>A class, <code>async</code>, <code>await</code>, <code>Map</code>, <code>Promise</code>, and Node's <code>require("rethinkdb")</code> are rejected in client and server TypeScript. The server sandbox has no <code>require</code>. Put npm packages in <code>src/backend</code>.</p>
</section>

<section id="commands">
  <h2>Commands</h2>
  <p><code>ts77</code> and <code>open77-ts</code> are the same program. <code>ts77 --version</code> prints the version. <code>ts77 help</code> prints examples. <code>--quiet</code> hides the success banner.</p>
  <table>
    <tr><th>Command</th><th>What you get</th></tr>
    <tr><td><code>ts77 create</code></td><td>A new plugin. Refuses a bad name, and refuses a folder that already has files unless you pass <code>--force</code>.</td></tr>
    <tr><td><code>ts77 init</code></td><td>Adds the basic template to an existing folder and skips files that are already there.</td></tr>
    <tr><td><code>ts77 dev</code></td><td>Rebuilds on save. Starts Vite only if the WebUI dependencies are installed. Starts Node only if <code>dist/backend</code> exists.</td></tr>
    <tr><td><code>ts77 build</code></td><td>Typechecks, emits Lua, writes the manifest, and builds the page when that target is on.</td></tr>
    <tr><td><code>ts77 watch</code></td><td>Same rebuild loop without Vite.</td></tr>
    <tr><td><code>ts77 deploy</code></td><td>Builds and copies the resource. Stops if no server directory is configured.</td></tr>
    <tr><td><code>ts77 validate</code></td><td>Checks that the manifest files exist and that the Lua parses.</td></tr>
    <tr><td><code>ts77 doctor</code></td><td>Reports Node, TypeScriptToLua, the catalogue build, and missing entries.</td></tr>
    <tr><td><code>ts77 types</code></td><td>Regenerates declarations from the local Devkit index. If the index is missing, it keeps the declarations already generated and says so.</td></tr>
    <tr><td><code>ts77 docs</code></td><td>Prints the path of this page. <code>--open</code> opens it.</td></tr>
    <tr><td><code>ts77 update</code></td><td>Prints the catalogue build. It does not download a new index and it does not publish.</td></tr>
    <tr><td><code>ts77 map file line</code></td><td>Turns a generated Lua line into a TypeScript file and line, using the source map on your machine.</td></tr>
  </table>
</section>

<section id="runtimes">
  <h2>Client and server</h2>
  <p>Each resource has its own Lua VM. The client VM runs on the player's PC. The server VM runs on the dedicated server. A function that exists only on the server is a compile error in a client file, and the reverse is also an error.</p>
  <p>Namespace calls use a dot: <code>Open77.webui.create(...)</code>, <code>TriggerServerEvent(...)</code>, <code>Open77.http.request(...)</code>. Page methods use a colon in the generated Lua: <code>page:send</code>, <code>page:on</code>, <code>page:destroy</code>. You write them as method calls in TypeScript. The declaration's <code>this</code> decides the punctuation.</p>
  <p>Many natives return a value and a reason. Read both:</p>
  <pre>const [page, reason] = Open77.webui.create({ entry: "web/index.html", layer: "hud" });</pre>
  <p><code>undefined</code> and <code>null</code> both become Lua <code>nil</code>. The scheduler is <code>CreateThread</code> and <code>Wait</code>, not JavaScript promises. <code>SetTimeout</code> with a capital S is a real server native. The banned name is the JavaScript <code>setTimeout</code>.</p>
</section>

<section id="events">
  <h2>Events</h2>
  <p>Create the gameplay template when you want a client and a server to talk. The shared file describes the payload. Both sides refuse anything else.</p>
  <pre>export function isPing(value: unknown): value is Ping {
    return isRecord(value) && isShortString(value.text, 96);
}</pre>
  <p>The client sends when it starts, then listens for the answer:</p>
  <pre>onClientResourceStart(() => {
    onNet("demo:pong", (payload) => {
        if (!isPing(payload)) return;
        print(greet(payload.text));
    });
    const ok = emitServer("demo:ping", { text: "Night City" });
    if (!ok) print("demo:ping was not sent");
});</pre>
  <p>The server ignores the message unless the caller is a connected player. During that callback the runtime sets the global <code>source</code>. <code>authenticatedPlayer()</code> reads it and returns the id only when it is 1 or greater. A player id inside the payload is not that check.</p>
  <pre>onNet("demo:ping", (payload) => {
    const player = authenticatedPlayer();
    if (player === undefined || !isPing(payload)) {
        print("rejected demo:ping");
        return;
    }
    const ok = emitClient(player, "demo:pong", { text: greet(payload.text) });
    if (!ok) print("demo:pong was not sent");
});</pre>
  <p><code>emitClient</code> refuses target <code>0</code>. Use a player id of 1 or more, or <code>-1</code> for everyone.</p>
  <p>Names that start with a reserved prefix, including <code>open77:</code> families such as <code>open77:dash:</code>, are refused. Payloads must be JSON-like: nil, booleans, finite numbers, strings, and tables without cycles. The host limit is 32 arguments and 48 KiB.</p>
  <p>A command handler receives the player and a string array. Lua command arguments are 1-based. The SDK presents them as a normal TypeScript array, so <code>args[0]</code> is the first word the player typed.</p>
</section>

<section id="webui">
  <h2>React and the Chromium page</h2>
  <p>The page runs in OPEN//77's Chromium surface. TS77 does not open a second browser as the game UI. <code>window.Open77</code> is a message bridge with four calls. It is not the native catalogue. The page cannot spawn a vehicle or grant money.</p>
  <table>
    <tr><th>Call</th><th>Direction</th></tr>
    <tr><td><code>Open77.ready()</code></td><td>Tell Lua the page finished loading. A <code>page:send</code> before this is dropped.</td></tr>
    <tr><td><code>Open77.on(event, handler)</code></td><td>Receive what Lua sent with <code>page:send</code>.</td></tr>
    <tr><td><code>Open77.emit(event, payload)</code></td><td>Raise an event Lua receives with <code>page:on</code>.</td></tr>
    <tr><td><code>Open77.invoke(event, payload)</code></td><td>Ask Lua for a result. Lua answers with <code>page:reply</code>.</td></tr>
  </table>
  <p>Create the page from client Lua. <code>createPage</code> uses layer <code>hud</code> or <code>menu</code>, which do not need a WebUI permission. On resource stop it calls <code>page:destroy()</code>. The webui template waits for the page, then sends state:</p>
  <pre>const page = createPage({ entry: webuiEntry, layer: "hud", transparent: true, visible: true });
if (page === undefined) return;
page.on("ui:ready", () => {
    page.send("hud:state", { text: greet("Night City") });
});
page.on("hud:ping", (payload: unknown) => {
    if (!isPing(payload)) return;
    emitServer("hello:ping", { text: payload.text });
});</pre>
  <p>The React page listens, then tells Lua it is ready. A button sends a message back. That message is not a native call. Client Lua turns it into <code>emitServer</code>.</p>
  <pre>api.on("hud:state", (payload) => {
    const state = payload as Partial&lt;HudState&gt;;
    if (typeof state.text === "string") setText(state.text);
});
api.ready();
bridge()?.emit("hud:ping", { text: "Night City" });</pre>
  <p>For the React template, install the UI dependencies too: <code>npm install --prefix ui</code> or, for fullstack, <code>npm install --prefix src/webui</code>. Dev mode serves Vite at <code>http://127.0.0.1:5173/</code>. In the game, that address is the player's computer, not the dedicated server.</p>
  <p>A message through the page bridge is capped at 2 MiB. A game event is still capped at 48 KiB. Production build writes files under <code>web/</code> and lists each one as <code>web_file</code> in the manifest.</p>
</section>

<section id="node">
  <h2>The Node companion</h2>
  <p>Node is a separate operating-system process. It is how you <code>require("rethinkdb")</code> or <code>require("chalk")</code>. Install the package in the plugin directory, then import it from <code>src/backend</code>. A basic plugin never starts this process.</p>
  <pre>npm install rethinkdb chalk</pre>
  <pre>const chalk = require("chalk");
const db = require("rethinkdb");</pre>
  <p>The game reaches Node with <code>Open77.http.request</code>. Node reaches the game with <code>POST /&lt;resource&gt;/bridge</code>, which the server registers with <code>Open77.http.listen</code>. There is no Lua WebSocket client in this catalogue, so the Lua side does not open one. WebSockets on Node are for a process that can sign the envelope.</p>
  <p>Set <code>OPEN77_BRIDGE_SECRET</code> to 16–256 characters before the companion listens. The game reads <code>open77_bridge_secret</code> from a convar or this resource's tunable. Do not put the secret in client TypeScript, the React page, or <code>server.jsonc</code>. The default in source is empty, and an empty secret refuses the call.</p>
  <p>Outbound HTTP stays off until <code>server.jsonc</code> sets <code>http.enabled</code> and lists the host in <code>http.allowedHosts</code>. The list is a hostname without a port, so <code>127.0.0.1</code> covers <code>http://127.0.0.1:11782</code>. Inbound handlers are a separate switch, <code>httpHandlers</code>, loopback by default.</p>
  <p><code>createResourceRequire(directory)</code> is Node's loader rooted at the plugin. It refuses an absolute path, a relative path that leaves the plugin, and the gameplay packages <code>@open77-ts/client</code>, <code>@open77-ts/server</code>, <code>@open77-ts/webui</code>, and <code>@open77/sdk</code>.</p>
</section>

<section id="deploy">
  <h2>Deploy</h2>
  <pre>npx ts2077 deploy --server D:\\open77-server</pre>
  <p>The server directory is the folder that contains <code>server.jsonc</code>. TS77 copies into <code>resources/&lt;plugin&gt;</code> inside it. The copy includes the manifest, <code>dist</code>, <code>web</code>, <code>modules</code>, and <code>files</code>. It does not include <code>node_modules</code>, <code>src</code>, or <code>.env</code>.</p>
  <p>If you have not named a server, deploy stops and tells you. It does not pick a folder on its own. After the copy, restart that resource on the server. TS77 does not reload the dedicated server.</p>
  <p>The wizard looks for <code>server.jsonc</code> in the current directory, parent directories, <code>OPEN77_SERVER</code>, and folders next to the toolchain.</p>
</section>

<section id="config">
  <h2>Configuration</h2>
  <p>Required fields are <code>name</code> and <code>version</code>. <code>autoStart</code> defaults to true. Entries default to <code>src/client/main.ts</code> and <code>src/server/main.ts</code>.</p>
  <p>If you omit <code>targets</code>, TS77 builds the client and the server, adds <code>webui</code> when <code>web.root</code> is set, and adds <code>node</code> when <code>backend</code> is set. An explicit <code>targets</code> array is used as written.</p>
  <pre>{
  "name": "my_plugin",
  "version": "1.0.0",
  "client": "src/client/main.ts",
  "server": "src/server/main.ts",
  "permissions": []
}</pre>
  <p><code>ts77.config.ts</code> must export an object. The compiler transpiles it in memory. Keep gameplay code out of it. <code>ts77 deploy --server</code> is the command that writes <code>serverResourcesDir</code> into <code>open77-ts.json</code>.</p>
</section>

<section id="manifest">
  <h2>The manifest</h2>
  <p><code>open77.lua</code> is a manifest DSL. It is not a Lua program. <code>auto_start true</code> is legal there and illegal as Lua, so do not parse the manifest with a Lua parser. The build rewrites the file.</p>
  <p>Permissions are the union of what you listed and the natives the compiler actually found in the Lua. A native mentioned only in a comment or a string is not treated as a call. Client and server permissions are resource-wide. <code>files/</code> becomes <code>file</code> lines. <code>web/</code> becomes <code>web_file</code> lines. Source maps are not shipped as game files.</p>
</section>

<section id="sdk">
  <h2>TS77 SDK</h2>
  <p>These are the helpers TS77 adds. The natives underneath keep their official names. Import the side you are on.</p>
  <h3>@open77/sdk/client and @open77-ts/client</h3>
  <table>
    <tr><th>Function</th><th>Behavior</th></tr>
    <tr><td><code>onClientResourceStart(handler)</code></td><td>Runs the handler when this resource starts on the client. Returns a handler id.</td></tr>
    <tr><td><code>onClientResourceStop(handler)</code></td><td>Runs when this resource stops. The handler receives the reason.</td></tr>
    <tr><td><code>clearHandlers()</code></td><td>Removes handlers this SDK registered.</td></tr>
    <tr><td><code>onNet(event, handler)</code></td><td>Listens for a server event. Refuses a reserved name.</td></tr>
    <tr><td><code>emitServer(event, payload)</code></td><td>Sends a payload to the server after a structural check and a size check. Returns false if it refused.</td></tr>
    <tr><td><code>loadModule(name)</code></td><td>Client sandbox <code>require</code>. <code>modules.tools</code> reads <code>modules/tools.lua</code>. <code>@library</code> reads a declared dependency. This is not Node.</td></tr>
    <tr><td><code>createPage(options)</code></td><td>Opens a hud or menu page and destroys it when the client resource stops.</td></tr>
  </table>
  <h3>@open77/sdk/server and @open77-ts/server</h3>
  <table>
    <tr><th>Function</th><th>Behavior</th></tr>
    <tr><td><code>onResourceStart</code> / <code>onResourceStop</code></td><td>Server lifecycle for this resource.</td></tr>
    <tr><td><code>clearHandlers()</code></td><td>Removes handlers this SDK registered on the server.</td></tr>
    <tr><td><code>onNet(event, handler)</code></td><td>Receives a client event. The player is <code>source</code> during the callback.</td></tr>
    <tr><td><code>authenticatedPlayer()</code></td><td>The caller id when it is a number of 1 or more. Otherwise <code>undefined</code>.</td></tr>
    <tr><td><code>emitClient(playerId, event, payload)</code></td><td>Sends to one player or to <code>-1</code>. Refuses <code>0</code>, reserved names, and payloads that are not serializable.</td></tr>
    <tr><td><code>onCommand(name, restricted, handler)</code></td><td>Registers a command. The handler gets the player and a string array.</td></tr>
  </table>
  <h3>@open77-ts/server/bridge</h3>
  <p>Import this only from server code that should talk to Node. Importing it adds <code>http.request</code> and <code>http.serve</code>.</p>
  <table>
    <tr><th>Function</th><th>Behavior</th></tr>
    <tr><td><code>serveBackend()</code></td><td>Listens on <code>/&lt;resource&gt;/bridge</code>.</td></tr>
    <tr><td><code>onBackendCall(method, handler)</code></td><td>Handles a signed call from Node.</td></tr>
    <tr><td><code>callNode(method, payload, callback, idempotent?)</code></td><td>Signs and posts to the companion. An empty secret returns <code>bridge_secret_missing</code> without HTTP. Status 0 or a timeout retries once when the call is idempotent. Other failures include <code>backend_offline</code>, <code>timeout</code>, <code>bad_response</code>, and <code>resource_stopped</code>.</td></tr>
  </table>
  <h3>@open77-ts/webui</h3>
  <p><code>emitPage</code>, <code>onPage</code>, and <code>readyPage</code> wrap <code>window.Open77</code>. They throw if the bridge is missing, which is what happens in a desktop browser that is not the game. <code>backendHealth</code> is a GET to the companion <code>/health</code> route. It does not send the secret.</p>
  <h3>@open77-ts/node</h3>
  <table>
    <tr><th>Export</th><th>Behavior</th></tr>
    <tr><td><code>startCompanion(options)</code></td><td>Fastify on <code>127.0.0.1</code> and port 11782 unless you change them. Body limit 16 KiB. Closes jobs and sockets on <code>close()</code>.</td></tr>
    <tr><td><code>callGame(options)</code></td><td>Posts a signed envelope to the game listener. Connection failure is <code>game_offline</code>. Timeout is <code>timeout</code>.</td></tr>
    <tr><td><code>MemoryNoteStore</code>, <code>SqlNoteStore</code>, <code>RedisNoteStore</code></td><td>Drivers for <code>notes.save</code>. The same request id returns the first row.</td></tr>
    <tr><td><code>safePath</code>, <code>readWithin</code></td><td>Read a file inside a root. Rejects <code>..</code>, NUL, and files over 16 KiB.</td></tr>
    <tr><td><code>JobRunner.every</code></td><td>A timer. <code>stop</code> clears it. <code>ms</code> must be at least 1.</td></tr>
    <tr><td><code>createResourceRequire</code></td><td>Sandboxed <code>require</code> for the plugin directory.</td></tr>
  </table>
</section>

<section id="api">
  <h2>Native API</h2>
  <p>Every row is a native in catalogue <strong>2.50.0+op77.148</strong>. Click a row for the signature, the return, and the failure reasons. Those lines come from that native's declaration. Three <code>await</code> methods are reserved words in TypeScript, so their text comes from the catalogue card and names the declared stand-in where one exists. An empty permission cell means the card lists none.</p>
  <p class="note">Client rows: ${natives.filter((row) => row.r === "client").length}. Server rows: ${natives.filter((row) => row.r === "server").length}. A summary was attached to ${natives.filter((row) => row.d).length} rows.</p>
  <div id="api-tools">
    <input id="api-search" type="search" placeholder="Search name, permission, summary" aria-label="Search natives">
    <button class="chip" type="button" data-side="all" aria-pressed="true">All</button>
    <button class="chip" type="button" data-side="client" aria-pressed="false">Client</button>
    <button class="chip" type="button" data-side="server" aria-pressed="false">Server</button>
    <button class="chip" id="api-all" type="button" aria-pressed="false">Show every native</button>
    <span id="api-count"></span>
  </div>
  <div class="table-wrap">
  <table>
    <thead><tr><th>Side</th><th>Native</th><th>Since</th><th>Permission</th><th>Summary</th></tr></thead>
    <tbody id="api-body"></tbody>
  </table>
  </div>
</section>

<section id="omitted">
  <h2>Omitted natives</h2>
  <p><span class="stamp">NOT ON THIS BUILD</span></p>
  <p>These cards are in the Devkit index and are not declared. Each one has no <code>since</code> build, or its <code>since</code> build is newer than 2.50.0+op77.148. Calling one is not offered as safe on this catalogue. Do not invent a replacement version.</p>
  <div id="omit-tools">
    <input id="omit-search" type="search" placeholder="Search omitted natives" aria-label="Search omitted natives">
    <span id="omit-count"></span>
  </div>
  <div class="table-wrap">
  <table>
    <thead><tr><th>Side</th><th>Native</th><th>Since</th></tr></thead>
    <tbody id="omit-body"></tbody>
  </table>
  </div>
</section>

<section id="endpoints">
  <h2>Companion endpoints</h2>
  <p>Default companion: <code>http://127.0.0.1:11782</code>. Default game listener in the server schema: <code>http://127.0.0.1:11781</code>. The signature is a JSON field, not a header. The HMAC covers the resource, id, method, timestamp, nonce, and the canonical payload, joined by newlines. Empty objects and empty arrays both sign as <code>{}</code>, because Lua has one kind of table.</p>
  <h3>GET /health</h3>
  <p>No signature. <code>200 { "ok": true }</code>. CORS allows GET from <code>http://127.0.0.1:5173</code>. POST from the browser is not allowed.</p>
  <h3>POST /v1/call and POST /v1/webhook</h3>
  <p>Body limit 16 KiB. <code>/v1/webhook</code> uses the same parser. It is not an open third-party webhook.</p>
  <table>
    <tr><th>Status</th><th>error</th><th>When</th></tr>
    <tr><td>200</td><td></td><td><code>{ ok, id, result }</code></td></tr>
    <tr><td>400</td><td><code>invalid_envelope</code></td><td>Not an envelope, or the signature is not 64 lowercase hex characters.</td></tr>
    <tr><td>400</td><td><code>invalid_payload</code></td><td>The method schema rejected the body.</td></tr>
    <tr><td>400</td><td><code>path_rejected</code></td><td><code>files.read</code> left the root.</td></tr>
    <tr><td>400</td><td><code>files_disabled</code></td><td><code>files.read</code> and no <code>filesRoot</code>.</td></tr>
    <tr><td>400</td><td><code>file_too_large</code></td><td>File over 16 KiB.</td></tr>
    <tr><td>401</td><td><code>unauthorized</code></td><td>Clock skew over 30 seconds, bad HMAC, or a replayed nonce.</td></tr>
    <tr><td>404</td><td><code>unknown_method</code></td><td>No handler.</td></tr>
    <tr><td>429</td><td><code>rate_limited</code></td><td>More than 30 accepted calls per resource per 10 seconds. A bad signature does not consume a token.</td></tr>
    <tr><td>500</td><td>other</td><td>The handler threw.</td></tr>
  </table>
  <p>Built-in methods: <code>notes.save</code> (playerId and text of 1–96 characters; the row id is the request id), <code>files.read</code>, <code>bridge.disconnect</code> (result <code>{ cleared: true }</code>), <code>notes.ping</code> (result <code>{ pong: true }</code>), and <code>webhook.receive</code>. Idempotent methods remember a success for 60 seconds.</p>
  <h3>WebSocket /v1/events</h3>
  <p>The first message must be a signed envelope with method <code>bridge.hello</code>. A bad first message closes with code 4001. After that, <code>{ "type": "ping" }</code> is answered with <code>{ "type": "pong" }</code>.</p>
  <h3>POST /&lt;resource&gt;/bridge</h3>
  <p>Node calls this on the game listener. The Lua resource must have called <code>serveBackend()</code>. The body limit on the way in is 16 KiB. Sixteen requests can be in flight. A route disappears when the resource stops.</p>
</section>

<section id="trouble">
  <h2>Troubleshooting</h2>
  <table>
    <tr><th>What you see</th><th>What to do</th></tr>
    <tr><td><code>node</code> is not recognized</td><td>Install Node.js 20 or newer and open a new terminal.</td></tr>
    <tr><td>The name is rejected</td><td>Use <code>my_plugin</code>, not spaces, capitals, or hyphens. The folder name must match.</td></tr>
    <tr><td>The folder already has files</td><td>Pick a new folder, or pass <code>--force</code>. Force copies template files over files of the same name. It does not delete the rest.</td></tr>
    <tr><td>Deploy says it is not configured</td><td>Pass <code>--server</code> with the folder that contains <code>server.jsonc</code>.</td></tr>
    <tr><td>A native is missing from autocomplete</td><td>Check the omitted table. If it is listed, this catalogue does not declare it.</td></tr>
    <tr><td>Client file imports <code>fs</code> or <code>rethinkdb</code></td><td>Move that import to <code>src/backend</code>. The Lua sandbox cannot run it.</td></tr>
    <tr><td>Node companion exits at once</td><td>The secret must be 16 to 256 characters.</td></tr>
    <tr><td><code>host_not_allowed</code></td><td>Add the companion hostname to <code>http.allowedHosts</code> and turn HTTP on.</td></tr>
    <tr><td><code>http_handlers_unavailable</code></td><td>Turn on <code>httpHandlers</code> in <code>server.jsonc</code>.</td></tr>
    <tr><td>The React page is blank in game</td><td>Call <code>Open77.ready()</code>. Send state after that. Confirm the dev URL is reachable from the player's PC.</td></tr>
    <tr><td>Vite did not start</td><td>Run <code>npm install</code> inside <code>ui/</code> or <code>src/webui/</code>.</td></tr>
    <tr><td>A Lua line has no TypeScript location</td><td><code>ts77 map</code> needs the <code>.lua.map</code> file on the machine that built the resource. The game has no <code>debug</code> library.</td></tr>
    <tr><td>Windows path with spaces</td><td>Quote the path. The resource slug itself still cannot contain a space.</td></tr>
  </table>
</section>

<section id="limits">
  <h2>Limits</h2>
  <p>The dedicated server sandbox has no <code>require</code>, <code>os</code>, <code>io</code>, <code>debug</code>, <code>package</code>, <code>load</code>, or <code>collectgarbage</code>. The client also removes <code>setmetatable</code>. Bundles inline their helpers and do not fall back to a global <code>require</code>.</p>
  <p>Declarations in this package follow catalogue 2.50.0+op77.148. A native added in a later server build is not declared until that catalogue is updated.</p>
  <footer>TS77 · catalogue 2.50.0+op77.148 · declarations generated from the OPEN//77 Devkit index · ${natives.length} declared natives · ${omitted.length} omitted</footer>
</section>
</main>
<aside class="rail" aria-label="On this page">
  <p>On this page</p>
  <a href="#start">Start here</a>
  <a href="#path">What runs where</a>
  <a href="#install">Install</a>
  <a href="#first">First plugin</a>
  <a href="#files">Files</a>
  <a href="#edit">Edit TypeScript</a>
  <a href="#commands">Commands</a>
  <a href="#runtimes">Client and server</a>
  <a href="#events">Events</a>
  <a href="#webui">React WebUI</a>
  <a href="#node">Node companion</a>
  <a href="#deploy">Deploy</a>
  <a href="#config">Configuration</a>
  <a href="#manifest">Manifest</a>
  <a href="#sdk">TS77 SDK</a>
  <a href="#api">Native API</a>
  <a href="#omitted">Omitted natives</a>
  <a href="#endpoints">HTTP endpoints</a>
  <a href="#trouble">Troubleshooting</a>
  <a href="#limits">Limits</a>
</aside>
</div>
<script id="api-data" type="application/json">${payload}</script>
<script>
(function () {
  var data = JSON.parse(document.getElementById("api-data").textContent);
  var side = "all";
  var query = "";
  var showAll = false;
  var body = document.getElementById("api-body");
  var count = document.getElementById("api-count");
  function cell(text) {
    var td = document.createElement("td");
    td.textContent = text || "";
    return td;
  }
  function addLine(parent, label, text) {
    if (!text) return;
    var p = document.createElement("p");
    var strong = document.createElement("strong");
    strong.textContent = label;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(" " + text));
    parent.appendChild(p);
  }
  function toggle(tr, row) {
    var next = tr.nextElementSibling;
    if (next && next.className === "detail") {
      next.remove();
      tr.setAttribute("aria-expanded", "false");
      return;
    }
    var detail = document.createElement("tr");
    detail.className = "detail";
    var td = document.createElement("td");
    td.colSpan = 5;
    addLine(td, "Signature", row.g);
    addLine(td, "Returns", row.o);
    addLine(td, "Failure", row.f);
    addLine(td, "Detail", row.x);
    if (!row.g && !row.o && !row.f && !row.x) addLine(td, "Declaration", "This catalogue lists the native. Open it in the editor for the full card.");
    detail.appendChild(td);
    tr.after(detail);
    tr.setAttribute("aria-expanded", "true");
  }
  function draw() {
    var needle = query.trim().toLowerCase();
    var shown = 0;
    body.replaceChildren();
    for (var i = 0; i < data.natives.length; i += 1) {
      var row = data.natives[i];
      if (side !== "all" && row.r !== side) continue;
      var blob = (row.n + " " + row.p + " " + row.d + " " + row.x + " " + row.g + " " + row.f).toLowerCase();
      if (needle && blob.indexOf(needle) < 0) continue;
      shown += 1;
      if (!needle && side === "all" && !showAll && shown > 40) continue;
      var tr = document.createElement("tr");
      tr.className = "api-row";
      tr.tabIndex = 0;
      tr.setAttribute("role", "button");
      tr.setAttribute("aria-label", row.r + " " + row.n);
      tr.setAttribute("aria-expanded", "false");
      tr.appendChild(cell(row.r));
      tr.appendChild(cell(row.n));
      tr.appendChild(cell(row.s));
      tr.appendChild(cell(row.p));
      tr.appendChild(cell(row.d));
      (function (current, node) {
        function open() { toggle(node, current); }
        node.addEventListener("click", open);
        node.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
          }
        });
      })(row, tr);
      body.appendChild(tr);
    }
    var preview = !needle && side === "all" && !showAll && shown > 40;
    count.textContent = preview ? "40 of " + shown + " — search, or show every native" : shown + " natives";
  }
  document.getElementById("api-all").addEventListener("click", function (event) {
    showAll = !showAll;
    event.currentTarget.setAttribute("aria-pressed", showAll ? "true" : "false");
    event.currentTarget.textContent = showAll ? "Show a short list" : "Show every native";
    draw();
  });
  document.getElementById("api-search").addEventListener("input", function (event) {
    query = event.target.value;
    draw();
  });
  var chips = document.querySelectorAll("#api-tools .chip");
  for (var c = 0; c < chips.length; c += 1) {
    chips[c].addEventListener("click", function (event) {
      side = event.currentTarget.getAttribute("data-side");
      for (var k = 0; k < chips.length; k += 1) chips[k].setAttribute("aria-pressed", chips[k] === event.currentTarget ? "true" : "false");
      draw();
    });
  }
  draw();
  var omitBody = document.getElementById("omit-body");
  var omitCount = document.getElementById("omit-count");
  function drawOmitted() {
    var needle = document.getElementById("omit-search").value.trim().toLowerCase();
    omitBody.replaceChildren();
    var shown = 0;
    for (var i = 0; i < data.omitted.length; i += 1) {
      var row = data.omitted[i];
      if (needle && (row.n + " " + row.s).toLowerCase().indexOf(needle) < 0) continue;
      shown += 1;
      var tr = document.createElement("tr");
      tr.appendChild(cell(row.r));
      tr.appendChild(cell(row.n));
      tr.appendChild(cell(row.s));
      omitBody.appendChild(tr);
    }
    omitCount.textContent = shown + " omitted";
  }
  document.getElementById("omit-search").addEventListener("input", drawOmitted);
  drawOmitted();
  var toc = document.querySelectorAll(".side a, .rail a");
  var marks = [];
  for (var t = 0; t < toc.length; t += 1) {
    var href = toc[t].getAttribute("href") || "";
    var target = href.charAt(0) === "#" ? document.getElementById(href.slice(1)) : null;
    if (target) marks.push({ link: toc[t], target: target, href: href });
  }
  function mark() {
    var active = marks.length ? marks[0].href : "";
    for (var i = 0; i < marks.length; i += 1) {
      if (marks[i].target.getBoundingClientRect().top <= 96) active = marks[i].href;
    }
    for (var j = 0; j < marks.length; j += 1) marks[j].link.classList.toggle("on", marks[j].href === active);
  }
  window.addEventListener("scroll", mark, { passive: true });
  mark();
})();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(root, "docs", "index.html"), page, "utf8");
const described = natives.filter((row) => row.d).length;
process.stdout.write(`wrote docs/index.html natives=${natives.length} described=${described} omitted=${omitted.length} bytes=${Buffer.byteLength(page)}\n`);
