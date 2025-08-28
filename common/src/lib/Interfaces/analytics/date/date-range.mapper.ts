import { DateRangeObj } from './date-range-obj.interface';
import { DateRangeStr } from './date-range-str.interface';

export const toDateObj = (r: DateRangeStr): DateRangeObj => ({ start: new Date(r.start), end: new Date(r.end) });

export const toDateStr = (r: DateRangeObj): DateRangeStr => ({
    start: r.start.toISOString(),
    end: r.end.toISOString(),
});
