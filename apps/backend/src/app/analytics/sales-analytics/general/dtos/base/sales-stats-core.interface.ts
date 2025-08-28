import { SalesCandle, SalesSummary } from '@common/Interfaces';

export interface SalesStatsCore {
    summary: SalesSummary;
    candles: SalesCandle[];
}
