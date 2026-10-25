export function freshTimestamp(timestamp: number, now: number, windowMs = 30_000): boolean {
    if (timestamp !== Math.floor(timestamp)) return false;
    const delta = now > timestamp ? now - timestamp : timestamp - now;
    return delta <= windowMs;
}

/** Returns false when this nonce was already accepted inside the window. */
export function rememberNonce(seen: Map<string, number>, nonce: string, now: number, ttl = 60_000): boolean {
    for (const [key, at] of seen) {
        if (now - at > ttl) seen.delete(key);
    }
    if (seen.has(nonce)) return false;
    seen.set(nonce, now);
    return true;
}

export function allowRate(
    buckets: Map<string, { count: number; reset: number }>,
    key: string,
    now: number,
    limit: number,
    windowMs: number,
): boolean {
    const bucket = buckets.get(key);
    if (!bucket || now >= bucket.reset) {
        buckets.set(key, { count: 1, reset: now + windowMs });
        return true;
    }
    if (bucket.count >= limit) return false;
    bucket.count += 1;
    return true;
}

export class Idempotency {
    private readonly done = new Map<string, { at: number; result: unknown }>();
    private readonly pending = new Map<string, Promise<unknown>>();

    constructor(private readonly ttl: number) {}

    async once(key: string, now: number, work: () => Promise<unknown>): Promise<unknown> {
        const existing = this.done.get(key);
        if (existing && now - existing.at <= this.ttl) return existing.result;
        const inflight = this.pending.get(key);
        if (inflight) return inflight;
        const promise = work().then((result) => {
            this.done.set(key, { at: now, result });
            this.pending.delete(key);
            return result;
        }, (error: unknown) => {
            this.pending.delete(key);
            throw error;
        });
        this.pending.set(key, promise);
        return promise;
    }
}
