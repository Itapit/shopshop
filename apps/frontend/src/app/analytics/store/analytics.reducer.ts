import { createFeature, createReducer, on } from '@ngrx/store';
import { analyticsActions } from './analytics.actions';
import { analyticsFeatureKey, initialAnalyticsState } from './analytics.state';

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

export const analyticsFeature = createFeature({
    name: analyticsFeatureKey,
    reducer: analyticsReducer,
});
