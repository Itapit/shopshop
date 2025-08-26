import { TopProductsProfitResponse, TopProductsQuantityResponse } from '@common/Interfaces';
import { ChartData } from 'chart.js';
import { toChartDataLong } from '../../generic-graphs/services/chart-adapter';

type MetricKey = 'quantity' | 'profit';
type TopProductsResponse = TopProductsQuantityResponse | TopProductsProfitResponse;

export function topProductsToChartData(
    resp: TopProductsResponse,
    opts?: {
        productLabels?: Record<string, string>;
        includeTotals?: boolean;
        metric?: MetricKey;
        order?: string[];
    }
): ChartData<'bar' | 'line'> {
    const months: string[] = (resp as any).months ?? [];
    const rows: any[] = (resp as any).rows ?? [];
    const totals = opts?.includeTotals ? (resp as any).totalsPerMonth : undefined;

    const metric: MetricKey =
        opts?.metric ?? (rows.some((r) => typeof r.quantity === 'number') ? 'quantity' : 'profit');

    return toChartDataLong(rows, {
        categoryKey: 'month', // x-axis
        seriesKey: 'productId', // series
        valueKey: metric, // 'quantity' or 'profit'
        seriesLabelKey: 'productName',
        seriesLabels: opts?.productLabels,
        categories: months, // keep server order
        seriesOrder: opts?.order,
        totals,
        aggregate: 'sum',
        fill: 0,
    });
}
