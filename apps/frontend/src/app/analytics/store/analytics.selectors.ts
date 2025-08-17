import { createFeatureSelector, createSelector } from '@ngrx/store';
import { analyticsFeatureKey, AnalyticsState } from './analytics.state';

export const selectAnalyticsState = createFeatureSelector<AnalyticsState>(analyticsFeatureKey);

export const selectGlobalDateRange = createSelector(selectAnalyticsState, (s) => s.globalDate);

export const selectGlobalPreset = createSelector(selectAnalyticsState, (s) => s.presetDate);

export const selectGlobalLabel = createSelector(selectGlobalDateRange, selectGlobalPreset, (range, preset) => {
    const fmt = (d: Date) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
    return `${preset}: ${fmt(range.start)} -> ${fmt(range.end)}`;
});
