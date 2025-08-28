import { DateRangeStr } from '../date/date-range-str.interface';

export interface Candle<TMetrics> {
    dateRange: DateRangeStr;
    metrics: TMetrics;
}
