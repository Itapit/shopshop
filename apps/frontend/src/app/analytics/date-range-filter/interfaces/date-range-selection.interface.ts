import { DatePresetKey } from '../enums/date-preset-key.enum';
import { DateRange } from './date-range.interface';

export interface DateRangeSelection {
    range: DateRange;
    preset: DatePresetKey;
}
