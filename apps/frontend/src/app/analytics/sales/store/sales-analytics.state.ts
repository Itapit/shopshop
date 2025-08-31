import { SalesCandle, SalesSummary } from '@common/Interfaces';

export const salesAnalyticsFeatureKey = 'salesAnalytics';

export interface SalesAnalyticsState {
    candles: ReadonlyArray<SalesCandle> | null;
    summary: SalesSummary | null;
    loading: boolean;
    error: string | null;
}

export const initialSalesAnalyticsState: SalesAnalyticsState = {
    candles: null,
    summary: null,
    loading: false,
    error: null,
};
