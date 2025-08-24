import { SalesCandle, SalesSummery } from '@common/Interfaces';

export interface SalesStatsCore {
    summery: SalesSummery;
    candles: SalesCandle[];
}
