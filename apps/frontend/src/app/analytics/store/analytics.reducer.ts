import { createReducer, on } from '@ngrx/store';
import * as analyticsActions from './analytics.actions';
import { initialanalyticsState } from './analytics.state';

export const analyticsReducer = createReducer(
    initialanalyticsState,

    on(analyticsActions.applyGlobalRange, (state, { range, preset }) => ({
        ...state,
        globalDate: { start: new Date(range.start), end: new Date(range.end) },
        presetDate: preset,
    })),

    on(analyticsActions.clearGlobalDateRange, () => initialanalyticsState)
);
