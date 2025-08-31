import type { Candle, DateRangeStr } from '@common/Interfaces';
import { toDateObj } from '@common/Interfaces';
import type { ChartData, ChartType } from 'chart.js';
import { toChartDataLong } from '../../generic-graphs/services/chart-adapter';

export type NumericKeys<T> = {
    [K in keyof T]-?: NonNullable<T[K]> extends number ? K : never;
}[keyof T];

const isoStart = (r: DateRangeStr) => toDateObj(r).start.toISOString();
const sortByStart = <T>(a: Candle<T>, b: Candle<T>) =>
    toDateObj(a.dateRange).start.getTime() - toDateObj(b.dateRange).start.getTime();

//  candles -> ChartData
export function candlesToChartDataForMetrics<TMetrics extends object, TType extends ChartType = ChartType>(
    candles: ReadonlyArray<Candle<TMetrics>> | null | undefined,
    metrics: NumericKeys<TMetrics>[],
    opts?: {
        seriesLabels?: Record<string, string>;
        seriesOrder?: string[];
    }
): ChartData<TType> {
    const sorted = [...(candles ?? [])].sort(sortByStart);

    const rows: Array<{ date: string; metric: string; value: number }> = [];
    for (const c of sorted) {
        const date = isoStart(c.dateRange);
        for (const k of metrics as string[]) {
            rows.push({ date, metric: k, value: Number((c as any).metrics[k] ?? 0) });
        }
    }

    return toChartDataLong(rows, {
        categoryKey: 'date',
        seriesKey: 'metric',
        valueKey: 'value',
        ...(opts?.seriesLabels ? { seriesLabels: opts.seriesLabels } : {}),
        ...(opts?.seriesOrder ? { seriesOrder: opts.seriesOrder } : {}),
    }) as ChartData<TType>;
}
