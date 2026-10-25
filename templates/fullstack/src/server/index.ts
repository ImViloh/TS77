import { authenticatedPlayer, emitClient, onNet, onResourceStart } from "@open77-ts/server";
import { callNode, onBackendCall, serveBackend } from "@open77-ts/server/bridge";
import { isNoteRequest } from "../shared/contracts";

onResourceStart(() => {
    print("player_notes server started");
    serveBackend();
});

onBackendCall("notes.ping", () => {
    return { pong: true };
});

onNet("notes:save", (payload) => {
    const player = authenticatedPlayer();
    if (player === undefined || !isNoteRequest(payload)) {
        print("rejected notes:save");
        return;
    }
    // The player id is the server's source. The page cannot choose it, and this handler does not grant items, money, or vehicles.
    callNode("notes.save", { playerId: player, text: payload.text }, (result, failure) => {
        if (failure !== undefined) {
            emitClient(player, "notes:result", { ok: false, error: failure });
            return;
        }
        const text = typeof result === "object" && result !== null ? (result as { text?: unknown }).text : undefined;
        if (typeof text !== "string") {
            emitClient(player, "notes:result", { ok: false, error: "bad_response" });
            return;
        }
        emitClient(player, "notes:result", { ok: true, note: { text } });
    }, true);
});
