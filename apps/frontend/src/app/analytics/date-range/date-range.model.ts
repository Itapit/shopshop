export interface DateRange {
    start: Date;
    end: Date;
}

export enum DatePresetKey {
    LAST_7 = 'LAST_7',
    LAST_30 = 'LAST_30',
    LAST_90 = 'LAST_90',
    YTD = 'YTD',
    LAST_YEAR = 'LAST_YEAR',
    CUSTOM = 'CUSTOM',
}

export interface DateRangeSelection {
    range: DateRange;
    preset: DatePresetKey;
}

export enum DateRangeOptionsEnum {
    Global = 'global',
    Local = 'local',
}
