import { NET_MAX_BYTES, netProblem } from "../shared/net";
import { reservedEventProblem } from "../shared/reserved";

const tracked: number[] = [];

function remember(id: number): number {
    tracked.push(id);
    return id;
}

export function clearHandlers(): void {
    while (tracked.length > 0) {
        const id = tracked.pop();
        if (typeof id === "number") Open77.events.off(id);
    }
}

export function onClientResourceStart(handler: (this: void) => void): number {
    return remember(AddEventHandler("onClientResourceStart", (resourceName: unknown) => {
        if (resourceName === GetCurrentResourceName()) handler();
    }));
}

export function onClientResourceStop(handler: (this: void, reason: unknown) => void): number {
    return remember(AddEventHandler("onClientResourceStop", (resourceName: unknown, reason: unknown) => {
        if (resourceName === GetCurrentResourceName()) handler(reason);
    }));
}

export function onNet(event: string, handler: (this: void, payload: unknown) => void): number {
    const reserved = reservedEventProblem(event);
    if (reserved !== undefined) error(reserved + ": " + event);
    return remember(RegisterNetEvent(event, (payload: unknown) => {
        handler(payload);
    }));
}

/** Asks the server to handle `payload`. The server must validate it. */
export function emitServer(event: string, payload: unknown): boolean {
    const reserved = reservedEventProblem(event);
    if (reserved !== undefined) {
        print("refusing " + event + ": " + reserved);
        return false;
    }
    const structural = netProblem(payload, type);
    if (structural !== undefined) {
        print("refusing " + event + ": " + structural);
        return false;
    }
    const [encoded, encodeReason] = Open77.json.encode(payload);
    if (typeof encoded !== "string") {
        print("refusing " + event + ": " + tostring(encodeReason));
        return false;
    }
    if (encoded.length > NET_MAX_BYTES) {
        print("refusing " + event + ": network_payload_too_large");
        return false;
    }
    const ok = TriggerServerEvent(event, payload);
    if (ok !== true) {
        print("TriggerServerEvent failed");
        return false;
    }
    return true;
}

function moduleNameOk(name: string): boolean {
    if (name.length < 1 || name.length > 180) return false;
    let index = 0;
    if (name.charAt(0) === "@") index = 1;
    let segmentStart = true;
    for (; index < name.length; index++) {
        const code = name.charCodeAt(index);
        if (code === 46) {
            if (segmentStart) return false;
            segmentStart = true;
            continue;
        }
        const letter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
        const digit = code >= 48 && code <= 57;
        if (segmentStart) {
            if (!letter && code !== 95) return false;
            segmentStart = false;
            continue;
        }
        if (!letter && !digit && code !== 95 && code !== 45) return false;
    }
    return !segmentStart;
}

declare const _G: {
    require(this: void, module: string): LuaMultiReturn<[unknown | undefined, string | undefined]>;
};

/**
 * Loads a client Lua module through the sandbox `require`.
 * `modules.tools` reads `modules/tools.lua`. `@library` reads a declared dependency.
 * This is not Node's `require`. Databases and npm packages belong in `src/backend`.
 */
export function loadModule<T = unknown>(name: string): T | undefined {
    if (!moduleNameOk(name)) {
        print("require refused: invalid_module_name");
        return undefined;
    }
    const [value, reason] = _G.require(name);
    if (value === undefined) {
        print("require failed: " + tostring(reason));
        return undefined;
    }
    return value as T;
}

export interface WebUiOptions {
    entry: string;
    layer?: "hud" | "menu";
    transparent?: boolean;
    visible?: boolean;
}

/**
 * Creates a HUD or menu surface with `Open77.webui.create`.
 * `hud` and `menu` do not require a WebUI permission. Modal, system and debug are not offered here.
 */
export function createPage(options: WebUiOptions): WebUIPageApi | undefined {
    const body: Open77Table = {
        entry: options.entry,
        layer: options.layer === "menu" ? "menu" : "hud",
        transparent: options.transparent !== false,
        visible: options.visible !== false,
    };
    const [page, reason] = Open77.webui.create(body);
    if (page === undefined) {
        print("Open77.webui.create failed: " + tostring(reason));
        return undefined;
    }
    onClientResourceStop(() => {
        page.destroy();
    });
    return page;
}
