import { CandleInterval } from '@common/Enums';
import { SalesCandle, SalesSummery } from '../base';
import { DateRangeStr } from '../date';

export interface SalesStatsResponse {
    dateRange: DateRangeStr;
    candleInterval: CandleInterval;
    candles: SalesCandle[];
    summery: SalesSummery;
}
