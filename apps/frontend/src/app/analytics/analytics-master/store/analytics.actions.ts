import { CandleInterval } from '@common/Enums';
import { DateRangeObj } from '@common/Interfaces';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DatePresetKey } from '../../date-range-filter';

export const analyticsActions = createActionGroup({
    source: 'Analytics',
    events: {
        'Set Global By Preset': props<{ preset: DatePresetKey }>(),
        'Set Global By Custom Range': props<{ range: DateRangeObj }>(),
        'Apply Global Range': props<{ range: DateRangeObj; preset: DatePresetKey }>(),
        'Apply Defaults Values': props<{ preset: DatePresetKey; candleInterval: CandleInterval; timezone: string }>(),
        'Clear Global Date Range': emptyProps(),
    },
});
