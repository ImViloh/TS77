import { useEffect, useRef, useState } from "react";
import { backendHealth, emitPage, onPage, readyPage } from "@open77-ts/webui";

export function App() {
    const [status, setStatus] = useState("Waiting for the game.");
    const [text, setText] = useState("");
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        onPage("notes:state", (payload) => {
            const message = typeof payload === "object" && payload !== null ? (payload as { text?: unknown }).text : undefined;
            if (typeof message === "string") setStatus(message);
        });
        onPage("notes:result", (payload) => {
            const record = typeof payload === "object" && payload !== null ? payload as { ok?: unknown; error?: unknown; note?: { text?: unknown } } : undefined;
            if (!record || record.ok !== true) {
                const reason = record && typeof record.error === "string" ? record.error : "rejected";
                setStatus(reason === "backend_offline" ? "The companion process is not running." : reason);
                paint(false);
                return;
            }
            const saved = record.note && typeof record.note.text === "string" ? record.note.text : "";
            setStatus(saved === "" ? "Saved." : "Saved: " + saved);
            paint(true);
        });
        try {
            readyPage();
        } catch {
            setStatus("Open this page inside OPEN//77.");
        }
        void backendHealth("http://127.0.0.1:11782/health").then((online) => {
            if (!online) return;
            setStatus((current) => current === "Waiting for the game." ? "Companion health check succeeded." : current);
        });
    }, []);

    const paint = (saved: boolean) => {
        const surface = canvas.current;
        if (!surface) return;
        const context = surface.getContext("2d");
        if (!context) return;
        context.clearRect(0, 0, surface.width, surface.height);
        context.fillStyle = saved ? "#fcee0a" : "#ff2a6d";
        context.fillRect(0, 0, saved ? surface.width : 12, surface.height);
    };

    return (
        <section className="panel">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" fill="none" stroke="#fcee0a" strokeWidth="2" />
                <path d="M7 9h10M7 13h6" stroke="#fcee0a" strokeWidth="2" />
            </svg>
            <p>{status}</p>
            <input value={text} maxLength={96} onChange={(event) => setText(event.target.value)} />
            <button type="button" onClick={() => {
                try {
                    emitPage("notes:submit", { text });
                } catch {
                    setStatus("Open this page inside OPEN//77.");
                }
            }}>Save</button>
            <canvas ref={canvas} width={240} height={8} />
        </section>
    );
}
