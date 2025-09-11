import { createFeature, createReducer, on } from '@ngrx/store';
import { logoutSuccess } from '../../../auth/store/auth.actions';
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
    })),
    on(logoutSuccess, () => initialSalesAnalyticsState)
);

export const salesAnalyticsFeature = createFeature({
    name: salesAnalyticsFeatureKey,
    reducer: salesAnalyticsReducer,
});
