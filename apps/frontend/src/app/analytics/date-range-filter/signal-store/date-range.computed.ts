import { computed } from '@angular/core';
import { withComputed } from '@ngrx/signals';
import { DatePresetKey, DateRange } from '../date-range.model';

export function withDateRangeLocalComputed() {
    return withComputed(({ enabled, localRange, globalSnapshot, localPreset }) => ({
        /** Use local when enabled & present, otherwise fall back to global snapshot */
        effectiveRange: computed<DateRange | null>(() => {
            const useLocal = enabled() && !!localRange();
            return useLocal ? localRange() : globalSnapshot();
        }),

        /** When local override is on, expose the local preset; else null */
        effectivePreset: computed<DatePresetKey | null>(() => {
            const useLocal = enabled() && !!localPreset();
            return useLocal ? localPreset() : null;
        }),
    }));
}
