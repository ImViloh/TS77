import { createPage, emitServer, onClientResourceStart, onNet } from "@open77-ts/client";
import { webuiEntry } from "../generated/flags";
import { isNoteRequest, isNoteResult } from "../shared/contracts";

onClientResourceStart(() => {
    const page = createPage({ entry: webuiEntry, layer: "hud", transparent: true, visible: true });
    if (page === undefined) return;
    page.on("ui:ready", () => {
        const sent = page.send("notes:state", { text: "Write a note. The server checks it before it is stored." });
        if (!sent) print("notes:state was not delivered");
    });
    page.on("notes:submit", (payload: unknown) => {
        if (!isNoteRequest(payload)) return;
        const ok = emitServer("notes:save", { text: payload.text });
        if (!ok) print("notes:save was not sent");
    });
    onNet("notes:result", (payload) => {
        if (!isNoteResult(payload)) return;
        const sent = page.send("notes:result", payload as { ok: boolean; error?: string; note?: { text: string } });
        if (!sent) print("notes:result was not delivered");
    });
});
