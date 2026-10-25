export { isNoteRequest, isNoteText } from "@open77-ts/shared";

export interface NoteResult {
    ok: boolean;
    error?: string;
    note?: { text: string };
}

export function isNoteResult(value: unknown): value is NoteResult {
    if (typeof value !== "object" || value === null) return false;
    const record = value as { ok?: unknown; error?: unknown; note?: unknown };
    if (record.ok === false) return typeof record.error === "string";
    if (record.ok !== true || typeof record.note !== "object" || record.note === null) return false;
    const text = (record.note as { text?: unknown }).text;
    return typeof text === "string";
}
