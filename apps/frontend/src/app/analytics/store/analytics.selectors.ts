import { DateRange } from '@common/Interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DatePresetKey } from '../date-range-filter/enums';
import { analyticsFeatureKey, AnalyticsState } from './analytics.state';

export const selectAnalyticsState = createFeatureSelector<AnalyticsState>(analyticsFeatureKey);

export const selectGlobalDateRange = createSelector(selectAnalyticsState, (s) => s.globalDate as DateRange | null);

export const selectGlobalPreset = createSelector(selectAnalyticsState, (s) => s.presetDate as DatePresetKey | null);

export const selectInitialized = createSelector(selectAnalyticsState, (s) => !!s.globalDate && !!s.presetDate);
