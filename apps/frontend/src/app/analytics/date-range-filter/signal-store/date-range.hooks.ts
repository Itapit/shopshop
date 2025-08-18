import { effect } from '@angular/core';
import { patchState, withHooks } from '@ngrx/signals';
import { DatePresetKey } from '../date-range.model';
import { cloneRange } from './date-range.state';

export function withDateRangeLocalHooks() {
    return withHooks((store) => {
        const { enabled, seededFromGlobal, globalSnapshot } = store;

        // populate the global snapshot the first time a user enable override
        const seedOnce = effect(() => {
            if (!enabled()) return;
            if (seededFromGlobal()) return;
            const snapshot = globalSnapshot();
            if (!snapshot) return;

            patchState(store, {
                localRange: cloneRange(snapshot),
                localPreset: DatePresetKey.CUSTOM,
                seededFromGlobal: true,
            });
        });

        return {
            onDestroy() {
                seedOnce.destroy();
            },
        };
    });
}
