import { authenticatedPlayer, emitClient, onCommand, onNet, onResourceStart } from "@open77/sdk/server";
import { isPing } from "../shared/events";
import { greet } from "../shared/greeting";

onResourceStart(() => {
    print(greet(GetCurrentResourceName()));
});

onCommand("hello", false, (player, args) => {
    const text = typeof args[0] === "string" && args[0].length > 0 ? args[0] : "Night City";
    if (player < 1) {
        print(greet(text));
        return;
    }
    const ok = emitClient(player, "hello:notice", { text: greet(text) });
    if (!ok) print("hello:notice was not sent");
});

onNet("hello:ping", (payload) => {
    const player = authenticatedPlayer();
    if (player === undefined || !isPing(payload)) {
        print("rejected hello:ping");
        return;
    }
    const ok = emitClient(player, "hello:notice", { text: greet(payload.text) });
    if (!ok) print("hello:notice was not sent");
});
