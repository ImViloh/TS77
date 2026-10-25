export interface SavedNote {
    id: string;
    playerId: number;
    text: string;
    savedAt: number;
}

export interface NoteStore {
    save(note: SavedNote): Promise<SavedNote>;
}

export class MemoryNoteStore implements NoteStore {
    private readonly notes = new Map<string, SavedNote>();

    async save(note: SavedNote): Promise<SavedNote> {
        const existing = this.notes.get(note.id);
        if (existing) return existing;
        this.notes.set(note.id, note);
        return note;
    }

    size(): number {
        return this.notes.size;
    }
}

const MYSQL_CREATE = "CREATE TABLE IF NOT EXISTS open77_notes (id VARCHAR(80) PRIMARY KEY, player_id INT NOT NULL, body VARCHAR(96) NOT NULL, saved_at BIGINT NOT NULL)";
const POSTGRES_CREATE = "CREATE TABLE IF NOT EXISTS open77_notes (id TEXT PRIMARY KEY, player_id INTEGER NOT NULL, body TEXT NOT NULL, saved_at BIGINT NOT NULL)";
const MYSQL_INSERT = "INSERT INTO open77_notes (id, player_id, body, saved_at) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = id";
const POSTGRES_INSERT = "INSERT INTO open77_notes (id, player_id, body, saved_at) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING";

export class SqlNoteStore implements NoteStore {
    constructor(
        private readonly query: (sql: string, params: unknown[]) => Promise<unknown>,
        private readonly flavor: "mysql" | "postgres",
    ) {}

    async ensure(): Promise<void> {
        await this.query(this.flavor === "mysql" ? MYSQL_CREATE : POSTGRES_CREATE, []);
    }

    async save(note: SavedNote): Promise<SavedNote> {
        await this.query(this.flavor === "mysql" ? MYSQL_INSERT : POSTGRES_INSERT, [note.id, note.playerId, note.text, note.savedAt]);
        return note;
    }
}

export interface RedisCommands {
    set(key: string, value: string, mode: "NX"): Promise<string | null>;
    get(key: string): Promise<string | null>;
}

export class RedisNoteStore implements NoteStore {
    constructor(private readonly redis: RedisCommands) {}

    async save(note: SavedNote): Promise<SavedNote> {
        const key = "open77:note:" + note.id;
        const created = await this.redis.set(key, JSON.stringify(note), "NX");
        if (created === null) {
            const existing = await this.redis.get(key);
            if (existing) return JSON.parse(existing) as SavedNote;
        }
        return note;
    }
}

interface MysqlPool {
    query(sql: string, params: unknown[]): Promise<unknown>;
}

interface PgPool {
    query(sql: string, params: unknown[]): Promise<unknown>;
}

export async function openMysqlStore(url: string): Promise<NoteStore> {
    const mysql = await import("mysql2/promise");
    const pool = mysql.createPool(url) as MysqlPool;
    const store = new SqlNoteStore((sql, params) => pool.query(sql, params), "mysql");
    await store.ensure();
    return store;
}

export async function openPostgresStore(url: string): Promise<NoteStore> {
    const pg = await import("pg");
    const pool = new pg.Pool({ connectionString: url }) as PgPool;
    const store = new SqlNoteStore((sql, params) => pool.query(sql, params), "postgres");
    await store.ensure();
    return store;
}

export async function openRedisStore(url: string): Promise<NoteStore> {
    const Redis = (await import("ioredis")).default;
    const client = new Redis(url);
    return new RedisNoteStore({
        set: (key, value, mode) => client.set(key, value, mode),
        get: (key) => client.get(key),
    });
}

export async function openStore(driver: "memory" | "mysql" | "postgres" | "redis", url?: string): Promise<NoteStore> {
    if (driver === "memory") return new MemoryNoteStore();
    if (!url) throw new Error("OPEN77_DATABASE_URL is required for " + driver);
    if (driver === "mysql") return openMysqlStore(url);
    if (driver === "postgres") return openPostgresStore(url);
    return openRedisStore(url);
}
