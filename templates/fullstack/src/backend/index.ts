import { startCompanion } from "@open77-ts/node";

// npm packages run in this process, outside the Lua sandbox.
// Install them in this resource directory, then import or require them here:
//   npm install rethinkdb chalk
//   const chalk = require("chalk");
//   const r = require("rethinkdb");

const driver = process.env.OPEN77_NOTES_DRIVER;
const selected = driver === "mysql" || driver === "postgres" || driver === "redis" ? driver : "memory";

startCompanion({
    secret: process.env.OPEN77_BRIDGE_SECRET ?? "",
    host: "127.0.0.1",
    port: Number(process.env.OPEN77_BRIDGE_PORT ?? 11782),
    driver: selected,
    databaseUrl: process.env.OPEN77_DATABASE_URL,
}).then((companion) => {
    companion.jobs.every(60_000, () => undefined);
    const shutdown = () => {
        void companion.close().then(() => process.exit(0));
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    process.stdout.write(`companion listening on ${companion.url}\n`);
}).catch((error: unknown) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
});
