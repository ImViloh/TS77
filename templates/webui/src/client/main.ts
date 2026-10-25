import { createPage, emitServer, onClientResourceStart, onNet } from "@open77/sdk/client";
import { isPing } from "../shared/events";
import { greet } from "../shared/greeting";
import { webuiEntry } from "../generated/flags";

onClientResourceStart(() => {
    const page = createPage({ entry: webuiEntry, layer: "hud", transparent: true, visible: true });
    if (page === undefined) return;
    page.on("ui:ready", () => {
        const sent = page.send("hud:state", { text: greet("Night City") });
        if (!sent) print("hud:state was not delivered");
    });
    page.on("hud:ping", (payload: unknown) => {
        if (!isPing(payload)) return;
        const ok = emitServer("hello:ping", { text: payload.text });
        if (!ok) print("hello:ping was not sent");
    });
    onNet("hello:notice", (payload) => {
        if (!isPing(payload)) return;
        const sent = page.send("hud:state", { text: payload.text });
        if (!sent) print("hud:state was not delivered");
    });
});
