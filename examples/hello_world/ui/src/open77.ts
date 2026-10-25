export interface HudState {
    text: string;
}

export interface Open77Bridge {
    on(event: string, handler: (payload: unknown) => void): void;
    emit(event: string, payload?: unknown): void;
    invoke(event: string, payload?: unknown): Promise<unknown>;
    ready(): void;
}

declare global {
    interface Window {
        Open77?: Open77Bridge;
    }
}

export function bridge(): Open77Bridge | undefined {
    return window.Open77;
}
