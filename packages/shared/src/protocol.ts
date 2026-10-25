import { hmacSha256Hex } from "./sha256";

export interface Envelope {
    resource: string;
    id: string;
    method: string;
    timestamp: number;
    nonce: string;
    signature: string;
    payload: unknown;
}

export interface UnsignedEnvelope {
    resource: string;
    id: string;
    method: string;
    timestamp: number;
    nonce: string;
    payload: unknown;
}

function quote(text: string): string {
    let out = "\"";
    for (let index = 0; index < text.length; index++) {
        const code = text.charCodeAt(index);
        if (code === 34) out += "\\\"";
        else if (code === 92) out += "\\\\";
        else if (code === 10) out += "\\n";
        else if (code === 13) out += "\\r";
        else if (code === 9) out += "\\t";
        else if (code < 32 || code > 126) {
            let hex = "";
            let rest = code;
            for (let digit = 0; digit < 4; digit++) {
                hex = "0123456789abcdef".charAt(rest % 16) + hex;
                rest = Math.floor(rest / 16);
            }
            out += "\\u" + hex;
        } else out += text.charAt(index);
    }
    return out + "\"";
}

function keyName(key: string): string {
    if (typeof (key as unknown) === "number") return String(Math.floor(key as unknown as number));
    return key;
}

function indexOfKey(name: string): number | undefined {
    if (name.length === 0 || name.length > 9) return undefined;
    if (name.length > 1 && name.charAt(0) === "0") return undefined;
    let value = 0;
    for (let index = 0; index < name.length; index++) {
        const code = name.charCodeAt(index);
        if (code < 48 || code > 57) return undefined;
        value = value * 10 + (code - 48);
    }
    return value;
}

/**
 * Lua cannot tell an empty object from an empty array, and TypeScriptToLua's
 * array test treats every empty table as an array. The signature form uses `{}`
 * for both so the game server and Node hash the same bytes.
 * A table is a list only when it is non-empty, dense, and has no named fields.
 */
function forEachKey(value: object, visit: (this: void, key: string) => void): void {
    for (const key in value) visit(key);
}

function isSequence(value: object): boolean {
    const list = value as unknown[];
    if (!Array.isArray(list)) return false;
    if (list.length === 0) return false;
    let count = 0;
    let named = false;
    forEachKey(value, (key) => {
        if (indexOfKey(keyName(key)) === undefined) named = true;
        count += 1;
    });
    if (named) return false;
    return count === list.length;
}

function canonicalObject(value: object): string {
    const names: string[] = [];
    const raws: string[] = [];
    forEachKey(value, (key) => {
        names.push(keyName(key));
        raws.push(key);
    });
    for (let left = 1; left < names.length; left++) {
        const name = names[left];
        const raw = raws[left];
        let index = left - 1;
        while (index >= 0 && names[index] > name) {
            names[index + 1] = names[index];
            raws[index + 1] = raws[index];
            index -= 1;
        }
        names[index + 1] = name;
        raws[index + 1] = raw;
    }
    let out = "{";
    let written = 0;
    for (let index = 0; index < names.length; index++) {
        const field = (value as Record<string, unknown>)[raws[index]];
        if (field === undefined) continue;
        if (written > 0) out += ",";
        out += quote(names[index]) + ":" + canonical(field);
        written += 1;
    }
    return out + "}";
}

/** Stable JSON. Key order and spacing are part of the signature. */
export function canonical(value: unknown): string {
    if (value === undefined || value === null) return "null";
    if (typeof value === "string") return quote(value);
    if (typeof value === "number") {
        if (value !== value || value > 1e15 || value < -1e15) return "null";
        if (Math.floor(value) === value) return String(Math.floor(value));
        return String(value);
    }
    if (typeof value === "boolean") return value ? "true" : "false";
    if (typeof value === "object" && isSequence(value)) {
        const list = value as unknown[];
        let out = "[";
        for (let index = 0; index < list.length; index++) {
            if (index > 0) out += ",";
            out += canonical(list[index]);
        }
        return out + "]";
    }
    if (typeof value === "object") return canonicalObject(value);
    return "null";
}

/** Decodes a request body, including one extra layer when a host JSON-encodes a string. */
export function parseJsonText(text: string, decode: (value: string) => unknown): unknown {
    const once = decode(text);
    if (typeof once !== "string") return once;
    const trimmed = once;
    const first = trimmed.charAt(0);
    if (first !== "{" && first !== "[") return once;
    const twice = decode(once);
    if (twice === undefined || twice === null) return once;
    return twice;
}

export function material(envelope: UnsignedEnvelope): string {
    return envelope.resource + "\n" + envelope.id + "\n" + envelope.method + "\n" + String(Math.floor(envelope.timestamp)) + "\n" + envelope.nonce + "\n" + canonical(envelope.payload);
}

export function signEnvelope(secret: string, envelope: UnsignedEnvelope): Envelope {
    return {
        resource: envelope.resource,
        id: envelope.id,
        method: envelope.method,
        timestamp: Math.floor(envelope.timestamp),
        nonce: envelope.nonce,
        payload: envelope.payload,
        signature: hmacSha256Hex(secret, material(envelope)),
    };
}

export function sameHex(left: string, right: string): boolean {
    if (left.length !== right.length) return false;
    let mismatch = 0;
    for (let index = 0; index < left.length; index++) {
        if (left.charCodeAt(index) !== right.charCodeAt(index)) mismatch += 1;
    }
    return mismatch === 0;
}

export function signaturesMatch(secret: string, envelope: Envelope): boolean {
    const expected = hmacSha256Hex(secret, material(envelope));
    return sameHex(expected, envelope.signature);
}

function isLowerHex(value: string): boolean {
    for (let index = 0; index < value.length; index++) {
        const code = value.charCodeAt(index);
        const digit = (code >= 48 && code <= 57) || (code >= 97 && code <= 102);
        if (!digit) return false;
    }
    return true;
}

function fieldText(value: unknown, min: number, max: number): string | undefined {
    if (typeof value !== "string") return undefined;
    if (value.length < min || value.length > max) return undefined;
    return value;
}

/** Structural check shared by the Node process and the compiled server script. */
export function readEnvelope(value: unknown): Envelope | undefined {
    if (typeof value !== "object" || value === null) return undefined;
    const record = value as Record<string, unknown>;
    const resource = fieldText(record.resource, 1, 64);
    const id = fieldText(record.id, 8, 80);
    const method = fieldText(record.method, 1, 64);
    const nonce = fieldText(record.nonce, 8, 80);
    const signature = fieldText(record.signature, 64, 64);
    if (signature !== undefined && !isLowerHex(signature)) return undefined;
    const timestamp = record.timestamp;
    if (resource === undefined || id === undefined || method === undefined || nonce === undefined || signature === undefined) return undefined;
    if (typeof timestamp !== "number" || timestamp !== Math.floor(timestamp) || timestamp < 0) return undefined;
    return {
        resource,
        id,
        method,
        timestamp,
        nonce,
        signature,
        payload: record.payload === undefined ? null : record.payload,
    };
}
