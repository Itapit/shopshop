import { CandleInterval } from '@common/Enums';
import { DateRangeObj } from '@common/Interfaces';
import { createAction, props } from '@ngrx/store';
import { DatePresetKey } from '../date-range-filter/enums';

export const setGlobalByPreset = createAction('[Analytics] Set Global By Preset', props<{ preset: DatePresetKey }>());

export const setGlobalByCustomRange = createAction(
    '[Analytics] Set Global By Custom Range',
    props<{ range: DateRangeObj }>()
);

export const applyGlobalRange = createAction(
    '[Analytics] Apply Global Range',
    props<{ range: DateRangeObj; preset: DatePresetKey }>()
);

export const applyDefaultsValues = createAction(
    '[Analytics] Apply Defaults Values',
    props<{ preset: DatePresetKey; candleInterval: CandleInterval; timezone: string }>()
);

export const clearGlobalDateRange = createAction('[Analytics] Clear Global');
