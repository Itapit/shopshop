import { DateRangeObj } from '@common/Interfaces';
import { DatePresetKey } from '../enums';

export type LocalDateRangeState = {
    // global range
    globalSnapshot: DateRangeObj | null;

    // local range
    enabled: boolean;
    localRange: DateRangeObj | null;
    localPreset: DatePresetKey | null;
    seededFromGlobal: boolean;

    // UI state for calendar
    calendarOpen: boolean;
    workingRange: DateRangeObj | null;
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

export function cloneRange(r: DateRangeObj | null): DateRangeObj | null {
    return r ? { start: new Date(r.start), end: new Date(r.end) } : null;
}
