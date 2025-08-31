import { Injectable } from '@angular/core';
import { CandleInterval } from '@common/Enums';
import type { ChartData, ChartType } from 'chart.js';
import { combineLatest, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChartLabelFormatterService {
    formatLabel(isoLike: string | number | Date, interval: CandleInterval, locale = 'en'): string {
        const d = typeof isoLike === 'string' || typeof isoLike === 'number' ? new Date(isoLike) : isoLike;

        const y = d.getUTCFullYear();
        const m = d.getUTCMonth(); // 0-11

        switch (interval) {
            case CandleInterval.Day: {
                const dd = String(d.getUTCDate()).padStart(2, '0');
                const mm = String(m + 1).padStart(2, '0');
                return `${dd}/${mm}/${y}`;
            }

            case CandleInterval.Month:
                return new Intl.DateTimeFormat(locale, {
                    month: 'short',
                    year: 'numeric',
                    timeZone: 'UTC',
                }).format(d);

            case CandleInterval.Quarter: {
                const q = Math.floor(m / 3) + 1;
                return `Q${q} ${y}`;
            }

            case CandleInterval.Week: {
                const wk = this.isoWeekNumber(d);
                return `Wk ${wk} ${y}`;
            }

            default:
                return new Intl.DateTimeFormat(locale, {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                    timeZone: 'UTC',
                }).format(d);
        }
    }

    // handle null interval
    formatLabels<T extends ChartType>(data: ChartData<T>, interval: CandleInterval, locale = 'en'): ChartData<T> {
        const labels = (data.labels ?? []) as (string | number | Date)[];
        const pretty = labels.map((l) => this.formatLabel(l, interval, locale));
        return { ...data, labels: pretty } as ChartData<T>;
    }

    //  if null/undefined, return data unchanged
    formatLabelsMaybe<T extends ChartType>(
        data: ChartData<T>,
        interval: CandleInterval | null | undefined,
        locale = 'en'
    ): ChartData<T> {
        if (interval == null) return data;
        return this.formatLabels(data, interval, locale);
    }

    /** Rx helper: accepts nullable interval$ */
    withPrettyLabels<T extends ChartType>(
        data$: Observable<ChartData<T>>,
        interval$: Observable<CandleInterval | null | undefined>,
        locale = 'en'
    ): Observable<ChartData<T>> {
        return combineLatest([data$, interval$]).pipe(
            map(([data, interval]) => this.formatLabelsMaybe(data, interval, locale))
        );
    }

    private isoWeekNumber(date: Date): number {
        const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    }
}
