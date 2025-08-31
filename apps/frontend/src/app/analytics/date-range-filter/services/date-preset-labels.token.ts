import { InjectionToken } from '@angular/core';
import { DatePresetKey } from '../enums';

export const DEFAULT_PRESET_LABELS: Record<DatePresetKey, string> = {
    [DatePresetKey.LAST_7]: 'Last 7 days',
    [DatePresetKey.LAST_30]: 'Last 30 days',
    [DatePresetKey.LAST_90]: 'Last 90 days',
    [DatePresetKey.YTD]: 'Year to date',
    [DatePresetKey.LAST_YEAR]: 'Last year',
    [DatePresetKey.CUSTOM]: 'Custom',
};

export const DATE_PRESET_LABELS = new InjectionToken<Record<DatePresetKey, string>>('DATE_PRESET_LABELS', {
    providedIn: 'root',
    factory: () => DEFAULT_PRESET_LABELS,
});
