import { createReducer, on } from '@ngrx/store';
import * as analyticsActions from './analytics.actions';
import { initialAnalyticsState } from './analytics.state';

export const analyticsReducer = createReducer(
    initialAnalyticsState,

    on(analyticsActions.applyGlobalRange, (state, { range, preset }) => ({
        ...state,
        globalDate: { start: new Date(range.start), end: new Date(range.end) },
        presetDate: preset,
    })),

    on(analyticsActions.clearGlobalDateRange, () => initialAnalyticsState),

    on(analyticsActions.applyDefaultsValues, (state, { preset, candleInterval, timezone }) => ({
        ...state,
        presetDate: preset,
        CandleInterval: candleInterval,
        timezone: timezone,
    }))
);
