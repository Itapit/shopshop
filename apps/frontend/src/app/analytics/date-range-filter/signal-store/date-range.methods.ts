import { inject } from '@angular/core';
import { DateRangeObj } from '@common/Interfaces';
import { patchState, withMethods } from '@ngrx/signals';
import { DatePresetKey } from '../enums';
import { DateRangeMathService } from '../services/date-range-math.service';
import { cloneRange } from './date-range.state';

export function withDateRangeLocalMethods() {
    return withMethods((store, math = inject(DateRangeMathService)) => {
        const { effectiveRange, workingRange } = store;

        return {
            /** Keep this in sync with the global NgRx selector from the container */
            updateGlobalSnapshot(global: DateRangeObj | null) {
                patchState(store, { globalSnapshot: cloneRange(global) });
            },

            /** Enable/disable local override. By default keeps cached local state across OFF->ON. */
            setEnabled(enabled: boolean, opts?: { dropCacheOnDisable?: boolean }) {
                const drop = !!opts?.dropCacheOnDisable;
                if (!enabled && drop) {
                    patchState(store, {
                        enabled,
                        localRange: null,
                        localPreset: null,
                        seededFromGlobal: false, // allow reseed next time it turns on
                    });
                } else {
                    patchState(store, { enabled });
                }
            },

            /** Set a local custom range directly (e.g., calendar Apply) */
            setLocalRange(range: DateRangeObj) {
                patchState(store, {
                    localRange: math.clampRange(range),
                    localPreset: DatePresetKey.CUSTOM,
                });
            },

            /** Compute & set a local preset while in local mode */
            setLocalPreset(preset: DatePresetKey) {
                patchState(store, {
                    localRange: math.computeRangeForPreset(preset),
                    localPreset: preset,
                });
            },

            /** Open the calendar and seed the working range */
            openCalendar(initial?: DateRangeObj | null) {
                const seed = cloneRange(initial ?? effectiveRange());
                patchState(store, { workingRange: seed, calendarOpen: true });
            },

            closeCalendar() {
                patchState(store, { calendarOpen: false });
            },

            /** Stage range as the user picks in the calendar (not applied yet) */
            stageWorkingRange(range: DateRangeObj | null) {
                patchState(store, { workingRange: range ? math.clampRange(range) : null });
            },

            /** Apply staged working range as CUSTOM and close the calendar */
            applyWorkingAsCustom(): DateRangeObj | null {
                const w = workingRange();
                if (!w) return null;
                const clean = math.clampRange(w);
                patchState(store, {
                    localRange: clean,
                    localPreset: DatePresetKey.CUSTOM,
                    calendarOpen: false,
                });
                return clean;
            },

            /** Manually clear the local cache and allow reseeding on next enable        */
            clearCache() {
                patchState(store, {
                    localRange: null,
                    localPreset: null,
                    seededFromGlobal: false,
                });
            },
        };
    });
}
