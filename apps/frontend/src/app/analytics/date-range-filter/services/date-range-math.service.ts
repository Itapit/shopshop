import { Injectable } from '@angular/core';
import { DateRangeObj } from '@common/Interfaces';
import { DatePresetKey } from '../enums';

@Injectable({ providedIn: 'root' })
export class DateRangeMathService {
    computeRangeForPreset(preset: DatePresetKey, nowMs: number = Date.now()): DateRangeObj {
        const end = this.endOfDay(new Date(nowMs));
        switch (preset) {
            case DatePresetKey.LAST_7:
                return { start: this.addDays(end, -6), end };
            case DatePresetKey.LAST_30:
                return { start: this.addDays(end, -29), end };
            case DatePresetKey.LAST_90:
                return { start: this.addDays(end, -89), end };
            case DatePresetKey.YTD: {
                const d = new Date(nowMs);
                return { start: new Date(d.getFullYear(), 0, 1), end };
            }
            case DatePresetKey.LAST_YEAR: {
                const d = new Date(nowMs),
                    y = d.getFullYear() - 1;
                return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59, 999) };
            }
            default:
                throw new Error('CUSTOM must be supplied with an explicit range');
        }
    }

    clampRange(range: DateRangeObj): DateRangeObj {
        const s = new Date(range.start),
            e = new Date(range.end);
        return s.getTime() <= e.getTime() ? { start: s, end: e } : { start: e, end: s };
    }

    endOfDay(d: Date): Date {
        const n = new Date(d);
        n.setHours(23, 59, 59, 999);
        return n;
    }
    addDays(d: Date, delta: number): Date {
        const n = new Date(d);
        n.setDate(n.getDate() + delta);
        return n;
    }
}
