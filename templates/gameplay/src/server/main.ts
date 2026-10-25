import { authenticatedPlayer, emitClient, onNet, onResourceStart } from "@open77/sdk/server";
import { isPing } from "../shared/events";
import { greet } from "../shared/greeting";

onResourceStart(() => {
    print(greet(GetCurrentResourceName()));
});

onNet("demo:ping", (payload) => {
    const player = authenticatedPlayer();
    if (player === undefined || !isPing(payload)) {
        print("rejected demo:ping");
        return;
    }
    const ok = emitClient(player, "demo:pong", { text: greet(payload.text) });
    if (!ok) print("demo:pong was not sent");
});
