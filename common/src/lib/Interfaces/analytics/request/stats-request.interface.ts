import { CandleInterval } from '../../../Enums/candle-interval.enum';
import { DateRange } from '../base';

export interface StatsRequest {
    dateRange: DateRange;
    candleInterval: CandleInterval;
}
