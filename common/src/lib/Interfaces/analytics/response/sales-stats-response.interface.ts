import { CandleInterval } from '@common/Enums';
import { SalesCandle, SalesSummary } from '../base';
import { DateRangeStr } from '../date';

export interface SalesStatsResponse {
    dateRange: DateRangeStr;
    candleInterval: CandleInterval;
    timezone: string; //Asia/Jerusalem for now, adding for future support
    candles: ReadonlyArray<SalesCandle>;
    summary: SalesSummary;
}
