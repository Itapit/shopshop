import { createFeature, createReducer, on } from '@ngrx/store';
import { salesAnalyticsActions } from './sales-analytics.actions';
import { initialSalesAnalyticsState, salesAnalyticsFeatureKey } from './sales-analytics.state';

export const salesAnalyticsReducer = createReducer(
    initialSalesAnalyticsState,

    on(salesAnalyticsActions.clearStats, () => initialSalesAnalyticsState),

    on(salesAnalyticsActions.loadGeneralStats, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(salesAnalyticsActions.loadGeneralStatsSuccess, (state, { salesStatsResponse }) => ({
        ...state,
        candles: salesStatsResponse.candles,
        summary: salesStatsResponse.summary,
        loading: false,
        error: null,
    })),

    on(salesAnalyticsActions.loadGeneralStatsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    }))
);

export const salesAnalyticsFeature = createFeature({
    name: salesAnalyticsFeatureKey,
    reducer: salesAnalyticsReducer,
});
