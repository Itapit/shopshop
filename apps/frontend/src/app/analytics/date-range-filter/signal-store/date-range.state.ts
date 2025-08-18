import { DatePresetKey, DateRange } from '../date-range.model';

export type LocalDateRangeState = {
    // global range
    globalSnapshot: DateRange | null;

    // local range
    enabled: boolean;
    localRange: DateRange | null;
    localPreset: DatePresetKey | null;
    seededFromGlobal: boolean;

    // UI state for calander
    calendarOpen: boolean;
    workingRange: DateRange | null;
};

export const initialLocalDateRangeState: LocalDateRangeState = {
    globalSnapshot: null,

    enabled: false,
    localRange: null,
    localPreset: null,
    seededFromGlobal: false,

    calendarOpen: false,
    workingRange: null,
};

export function cloneRange(r: DateRange | null): DateRange | null {
    return r ? { start: new Date(r.start), end: new Date(r.end) } : null;
}
