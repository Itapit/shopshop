import { createAction, props } from '@ngrx/store';
import { DatePresetKey } from '../date-range-filter/enums';
import { DateRange } from '../date-range-filter/interfaces';

export const setGlobalByPreset = createAction('[Analytics] Set Global By Preset', props<{ preset: DatePresetKey }>());

export const setGlobalByCustomRange = createAction(
    '[Analytics] Set Global By Custom Range',
    props<{ range: DateRange }>()
);

export const applyGlobalRange = createAction(
    '[Analytics] Apply Global Range',
    props<{ range: DateRange; preset: DatePresetKey }>()
);

export const clearGlobalDateRange = createAction('[Analytics] Clear Global');
