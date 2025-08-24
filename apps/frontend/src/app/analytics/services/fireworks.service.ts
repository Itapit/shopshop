import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

type ConfettiFn = (opts?: any) => void;

@Injectable({ providedIn: 'root' })
export class FireworksService {
    private platformId = inject(PLATFORM_ID);
    private confetti?: ConfettiFn;
    private loader?: Promise<ConfettiFn | undefined>;

    private async getConfetti(): Promise<ConfettiFn | undefined> {
        if (!isPlatformBrowser(this.platformId)) return undefined;
        if (this.confetti) return this.confetti;
        this.loader ??= import('canvas-confetti')
            .then((m) => (this.confetti = m.default as ConfettiFn))
            .catch(() => undefined);
        return this.loader;
    }

    async celebrate(durationMs = 1200, intervalMs = 250) {
        const confetti = await this.getConfetti();
        if (!confetti) return;
        const end = Date.now() + durationMs;

        const id = setInterval(() => {
            confetti({ particleCount: 200, angle: 50, spread: 100, origin: { x: 0 } });
            confetti({ particleCount: 200, angle: 130, spread: 100, origin: { x: 1 } });
            if (Date.now() > end) clearInterval(id);
        }, intervalMs);
    }
}
