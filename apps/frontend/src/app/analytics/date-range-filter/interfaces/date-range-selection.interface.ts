import { DateRange } from '../../../../../../../common/src/lib/Interfaces/analytics/base/date-range.interface';
import { DatePresetKey } from '../enums/date-preset-key.enum';

export interface DateRangeSelection {
    range: DateRange;
    preset: DatePresetKey;
}
