import { computed } from '@angular/core';
import { CandleInterval } from '@common/Enums';
import { withComputed } from '@ngrx/signals';

function intervalLabel(interval: CandleInterval | null): string {
    if (interval === null) return '—';
    switch (interval) {
        case CandleInterval.Day:
            return 'Day';
        case CandleInterval.Week:
            return 'Week';
        case CandleInterval.Month:
            return 'Month';
        case CandleInterval.Quarter:
            return 'Quarter';
        default:
            return String(interval);
    }
}

export function withCandleIntervalFilterComputed() {
    return withComputed(({ enabled, localInterval, globalSnapshot }) => ({
        // Use local when enabled & present, otherwise fall back to global snapshot
        effectiveInterval: computed<CandleInterval | null>(() => {
            const useLocal = enabled() && !!localInterval();
            return useLocal ? localInterval() : globalSnapshot();
        }),

        // whether a local override is currently taking effect
        isOverriding: computed<boolean>(() => enabled() && !!localInterval()),

        // interval label as text
        effectiveLabel: computed<string>(() =>
            intervalLabel(enabled() && !!localInterval() ? localInterval() : globalSnapshot())
        ),

        // True if there is any effective value global or local
        hasEffective: computed<boolean>(() => (enabled() && !!localInterval()) || !!globalSnapshot()),

        options: computed<{ label: string; value: CandleInterval }[]>(() => [
            { label: 'Day', value: CandleInterval.Day },
            { label: 'Week', value: CandleInterval.Week },
            { label: 'Month', value: CandleInterval.Month },
            { label: 'Quarter', value: CandleInterval.Quarter },
        ]),
    }));
}
