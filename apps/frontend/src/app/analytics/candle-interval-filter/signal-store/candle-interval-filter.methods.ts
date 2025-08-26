import { CandleInterval } from '@common/Enums';
import { patchState, withMethods } from '@ngrx/signals';

export function withCandleIntervalLocalMethods() {
    return withMethods((store) => {
        return {
            updateGlobalSnapshot(global: CandleInterval | null) {
                patchState(store, { globalSnapshot: global });
            },

            // Enable/disable local override. By default keeps cached local state across OFF->ON.
            setEnabled(enabled: boolean, opts?: { dropCacheOnDisable?: boolean }) {
                const drop = !!opts?.dropCacheOnDisable;

                if (!enabled && drop) {
                    // dropping cache
                    patchState(store, {
                        enabled,
                        localInterval: null,
                        seededFromGlobal: false,
                    });
                } else {
                    patchState(store, { enabled });
                }
            },

            // Set a local interval directly
            setLocalInterval(interval: CandleInterval | null) {
                patchState(store, { localInterval: interval });
            },

            // seed local from current global
            seedFromGlobal() {
                const g = store['globalSnapshot']?.() ?? null;
                patchState(store, { localInterval: g, seededFromGlobal: true });
            },

            // clear the local cache and allow reseeding on next enable
            clearCache() {
                patchState(store, {
                    localInterval: null,
                    seededFromGlobal: false,
                });
            },
        };
    });
}
