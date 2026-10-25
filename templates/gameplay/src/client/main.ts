import { emitServer, onClientResourceStart, onNet } from "@open77/sdk/client";
import { isPing } from "../shared/events";
import { greet } from "../shared/greeting";

onClientResourceStart(() => {
    onNet("demo:pong", (payload) => {
        if (!isPing(payload)) return;
        print(greet(payload.text));
    });
    const ok = emitServer("demo:ping", { text: "Night City" });
    if (!ok) print("demo:ping was not sent");
});
