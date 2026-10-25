import { NET_MAX_BYTES, netProblem } from "../shared/net";
import { reservedEventProblem } from "../shared/reserved";

const tracked: number[] = [];

function remember(id: number): number {
    tracked.push(id);
    return id;
}

/** Drops handlers this resource registered through the SDK. The host also drops them on stop. */
export function clearHandlers(): void {
    while (tracked.length > 0) {
        const id = tracked.pop();
        if (typeof id === "number") Open77.events.off(id);
    }
}

export function onResourceStart(handler: (this: void) => void): number {
    return remember(AddEventHandler("onResourceStart", (resourceName: unknown) => {
        if (resourceName === GetCurrentResourceName()) handler();
    }));
}

export function onResourceStop(handler: (this: void, reason: unknown) => void): number {
    return remember(AddEventHandler("onResourceStop", (resourceName: unknown, reason: unknown) => {
        if (resourceName === GetCurrentResourceName()) handler(reason);
    }));
}

/**
 * Server handler for an authenticated client event.
 * `source` is the player the server authenticated. The payload is not an identity.
 */
export function onNet(event: string, handler: (this: void, payload: unknown) => void): number {
    const reserved = reservedEventProblem(event);
    if (reserved !== undefined) error(reserved + ": " + event);
    return remember(RegisterNetEvent(event, (payload: unknown) => {
        handler(payload);
    }));
}

/** Registers a console or chat command. `player` is 0 at the server console and an authenticated id in chat. */
export function onCommand(name: string, restricted: boolean, handler: (this: void, player: number, args: string[]) => void): boolean {
    return RegisterCommand(name, (player: unknown, args: unknown) => {
        if (typeof player !== "number") return;
        const list: string[] = [];
        if (typeof args === "object" && args !== undefined && args !== null) {
            const packed = args as Record<number, unknown>;
            // Command arguments are a 1-based Lua array. TSTL does not shift this index.
            for (let index = 1; index <= 32; index += 1) {
                const value = packed[index];
                if (typeof value !== "string") break;
                list.push(value);
            }
        }
        handler(player, list);
    }, restricted);
}

/** Player id for the network handler that is running, or undefined for the console and for local events. */
export function authenticatedPlayer(): number | undefined {
    if (typeof source !== "number") return undefined;
    if (source < 1) return undefined;
    return source;
}

/**
 * Sends one payload to a player, or to every player when `playerId` is -1.
 * Refuses target 0, reserved names, and values the event codec cannot carry.
 * Prints the native failure reason instead of ignoring it.
 */
export function emitClient(playerId: number, event: string, payload: unknown): boolean {
    const reserved = reservedEventProblem(event);
    if (reserved !== undefined) {
        print("refusing " + event + ": " + reserved);
        return false;
    }
    if (playerId !== -1 && (!(playerId >= 1))) {
        print("refusing " + event + ": invalid_target");
        return false;
    }
    const structural = netProblem(payload, type);
    if (structural !== undefined) {
        print("refusing " + event + ": " + structural);
        return false;
    }
    const encoded = json.encode(payload);
    if (typeof encoded !== "string") {
        print("refusing " + event + ": network_payload_not_serializable");
        return false;
    }
    if (encoded.length > NET_MAX_BYTES) {
        print("refusing " + event + ": network_payload_too_large");
        return false;
    }
    const [ok, reason] = TriggerClientEvent(event, playerId, payload);
    if (ok !== true) {
        print("TriggerClientEvent failed: " + tostring(reason));
        return false;
    }
    return true;
}
