import { signEnvelope } from "@open77-ts/shared";

export interface GameCall {
    origin: string;
    resource: string;
    secret: string;
    method: string;
    payload: unknown;
    timeoutMs?: number;
}

export interface GameSuccess {
    ok: true;
    result: unknown;
}

export interface GameFailure {
    ok: false;
    error: string;
}

/**
 * Calls a route the game server registered with `Open77.http.listen("/bridge")`.
 * The companion does not open a WebSocket to the game: OPEN//77 documents HTTP for this direction.
 */
export async function callGame(input: GameCall): Promise<GameSuccess | GameFailure> {
    const timestamp = Date.now();
    const envelope = signEnvelope(input.secret, {
        resource: input.resource,
        id: String(timestamp) + "-game",
        method: input.method,
        timestamp,
        nonce: String(timestamp) + "-" + Math.floor(Math.random() * 1_000_000_000),
        payload: input.payload,
    });
    const url = input.origin.replace(/\/$/, "") + "/" + input.resource + "/bridge";
    let response: Response;
    try {
        response = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(envelope),
            signal: AbortSignal.timeout(input.timeoutMs ?? 5_000),
        });
    } catch (error) {
        const name = error instanceof Error ? error.name : "";
        if (name === "TimeoutError" || name === "AbortError") return { ok: false, error: "timeout" };
        return { ok: false, error: "game_offline" };
    }
    const text = await response.text();
    let decoded: unknown;
    try {
        decoded = JSON.parse(text);
    } catch {
        return { ok: false, error: "bad_response" };
    }
    if (typeof decoded !== "object" || decoded === null) return { ok: false, error: "bad_response" };
    const body = decoded as { ok?: unknown; result?: unknown; error?: unknown };
    if (body.ok === true) return { ok: true, result: body.result };
    return { ok: false, error: typeof body.error === "string" ? body.error : "game_error" };
}
