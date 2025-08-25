import { SalesCandle, SalesSummary } from '@common/Interfaces';

export const SalesAnalyticsFeatureKey = 'salesAnalytics';

export interface SalesAnalyticsState {
    candles: SalesCandle[] | null;
    summary: SalesSummary | null;
}

export const initialSalesAnalyticsState: SalesAnalyticsState = {
    candles: null,
    summary: null,
};
