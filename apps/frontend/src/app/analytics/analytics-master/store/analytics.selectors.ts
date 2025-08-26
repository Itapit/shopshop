import { createFeatureSelector, createSelector } from '@ngrx/store';
import { analyticsFeature } from './analytics.reducer';
import { analyticsFeatureKey, AnalyticsState } from './analytics.state';

export const { selectTimezone, selectCandleInterval, selectPresetDate, selectGlobalDate } = analyticsFeature;

export const selectAnalyticsState = createFeatureSelector<AnalyticsState>(analyticsFeatureKey);

export const selectInitialized = createSelector(selectAnalyticsState, (s) => !!s.globalDate && !!s.presetDate);
