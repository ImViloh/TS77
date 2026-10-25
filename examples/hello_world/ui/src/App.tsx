import { useEffect, useState } from "react";
import { bridge, type HudState } from "./open77";

export function App() {
    const [text, setText] = useState("Waiting for the server");
    useEffect(() => {
        const api = bridge();
        if (!api) return;
        api.on("hud:state", (payload) => {
            const state = payload as Partial<HudState>;
            if (typeof state.text === "string") setText(state.text);
        });
        api.ready();
    }, []);
    return (
        <section className="hud">
            <p className="eyebrow">OPEN//77</p>
            <h1>{text}</h1>
            <button type="button" onClick={() => bridge()?.emit("hud:ping", { text: "Night City" })}>
                Ping the server
            </button>
        </section>
    );
}
