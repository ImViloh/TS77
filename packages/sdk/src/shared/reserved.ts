/** Prefixes a resource must not raise. Generated from the Devkit events index. */
export const RESERVED_EVENT_PREFIXES: string[] = [
    "open77:abilities:",
    "open77:admin:",
    "open77:animations:",
    "open77:appearance:",
    "open77:audio:",
    "open77:callback:",
    "open77:camera:",
    "open77:clothing:",
    "open77:cyberlab:panel:",
    "open77:cyberlab:reflex:",
    "open77:cyberlab:slam:",
    "open77:cyberware:",
    "open77:dash:",
    "open77:discharge:",
    "open77:effects:",
    "open77:equipment:",
    "open77:gizmo:",
    "open77:hacking:",
    "open77:holoCallEyes:",
    "open77:latent:",
    "open77:leases:",
    "open77:loadingScreen:",
    "open77:npcs:",
    "open77:playerInteractions:",
    "open77:playerModel:",
    "open77:prevention:",
    "open77:reflex:",
    "open77:resource:",
    "open77:screen:",
    "open77:sound:",
    "open77:state:",
    "open77:travel:",
    "open77:vehicles:ai:",
    "open77:voice:",
    "open77:wardrobe:",
    "open77:weapons:"
];

export function reservedEventProblem(name: string): string | undefined {
    for (let index = 0; index < RESERVED_EVENT_PREFIXES.length; index += 1) {
        const prefix = RESERVED_EVENT_PREFIXES[index];
        if (prefix.length > 0 && name.substring(0, prefix.length) === prefix) {
            return "reserved_event_prefix";
        }
    }
    return undefined;
}
