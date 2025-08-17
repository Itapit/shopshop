import { DatePresetKey, DateRange } from './date-range/date-range.model';

export function computeRangeForPreset(preset: DatePresetKey, now: number = Date.now()): DateRange {
    const end = endOfDay(new Date(now));

    switch (preset) {
        case DatePresetKey.LAST_7:
            return { start: addDays(end, -6), end };
        case DatePresetKey.LAST_30:
            return { start: addDays(end, -29), end };
        case DatePresetKey.LAST_90:
            return { start: addDays(end, -89), end };
        case DatePresetKey.YTD: {
            const d = new Date(now);
            const start = new Date(d.getFullYear(), 0, 1);
            return { start, end };
        }
        case DatePresetKey.LAST_YEAR: {
            const d = new Date(now);
            const start = new Date(d.getFullYear() - 1, 0, 1);
            const e = new Date(d.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
            return { start, end: e };
        }
        case DatePresetKey.CUSTOM:
        default:
            throw new Error('CUSTOM must be supplied with an explicit range');
    }
}

export function addDays(d: Date, delta: number): Date {
    const n = new Date(d);
    n.setDate(n.getDate() + delta);
    return n;
}

export function endOfDay(d: Date): Date {
    const n = new Date(d);
    n.setHours(23, 59, 59, 999);
    return n;
}

export function clampRange(range: DateRange): DateRange {
    const start = new Date(range.start);
    const end = new Date(range.end);
    return start.getTime() <= end.getTime() ? { start, end } : { start: end, end: start };
}
