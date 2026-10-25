export interface NoteRequest {
    text: string;
}

/** A note body the game server, the companion, and the page can all carry. */
export function isNoteText(value: unknown): value is string {
    return typeof value === "string" && value.length >= 1 && value.length <= 96;
}

export function isNoteRequest(value: unknown): value is NoteRequest {
    if (typeof value !== "object" || value === null) return false;
    return isNoteText((value as { text?: unknown }).text);
}
