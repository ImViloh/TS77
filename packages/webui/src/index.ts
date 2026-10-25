/**
 * The page bridge documented by OPEN//77. `window.Open77` exists only inside a WebUI surface.
 * It cannot read the filesystem or start a process. Game grants go through client Lua to the server.
 */
export interface Open77PageBridge {
    on(event: string, handler: (payload: unknown) => void): void;
    emit(event: string, payload?: unknown): void;
    invoke(event: string, payload?: unknown): Promise<unknown>;
    ready(): void;
}

/** 2 MiB, the documented WebUI message ceiling. Game events are a separate, smaller limit. */
export const WEBUI_MESSAGE_MAX_BYTES = 2 * 1024 * 1024;

declare global {
    interface Window {
        Open77?: Open77PageBridge;
    }
}

export function pageBridge(): Open77PageBridge {
    const bridge = window.Open77;
    if (!bridge) throw new Error("window.Open77 is missing. This page is not inside an OPEN//77 WebUI.");
    return bridge;
}

export function emitPage(event: string, payload?: unknown): void {
    const encoded = JSON.stringify(payload ?? null);
    if (encoded.length > WEBUI_MESSAGE_MAX_BYTES) throw new Error("webui_message_too_large");
    pageBridge().emit(event, payload);
}

export function onPage(event: string, handler: (payload: unknown) => void): void {
    pageBridge().on(event, handler);
}

export function readyPage(): void {
    pageBridge().ready();
}

/**
 * Reads a non-authoritative companion endpoint from the browser.
 * The bridge secret is not available here. Saving a note does not use this function:
 * the page tells client Lua, and the game server calls the companion.
 * In a dedicated server, 127.0.0.1 is the player's PC, not the machine running Node.
 */
export async function backendHealth(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: "GET" });
        return response.ok;
    } catch {
        return false;
    }
}
