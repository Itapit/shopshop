import { DateRangeObj } from '@common/Interfaces';
import { DatePresetKey } from '../enums/date-preset-key.enum';

export interface DateRangeSelection {
    range: DateRangeObj;
    preset: DatePresetKey;
}
