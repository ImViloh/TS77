import { isRecord, isShortString } from "@open77/sdk/shared";

export interface Ping {
    text: string;
}

export function isPing(value: unknown): value is Ping {
    return isRecord(value) && isShortString(value.text, 96);
}
