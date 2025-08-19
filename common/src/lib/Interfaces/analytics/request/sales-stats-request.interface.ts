import { CandleInterval } from '../../../Enums/candle-interval.enum';
import { DateRangeStr } from '../date';

export interface SalesStatsRequest {
    dateRange: DateRangeStr;
    candleInterval: CandleInterval;
}
