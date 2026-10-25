/** In-process timers. `stop` drops them when the companion shuts down. */
export class JobRunner {
    private readonly timers: NodeJS.Timeout[] = [];

    every(ms: number, job: () => void): void {
        if (ms < 1) throw new Error("job interval must be at least 1 ms");
        this.timers.push(setInterval(job, ms));
    }

    stop(): void {
        while (this.timers.length > 0) {
            const timer = this.timers.pop();
            if (timer) clearInterval(timer);
        }
    }
}
