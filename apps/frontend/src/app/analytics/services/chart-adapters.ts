import { TopProductsProfitResponse, TopProductsQuantityResponse } from '@common/Interfaces';
import { ChartData } from 'chart.js';

type MetricKey = 'quantity' | 'profit';
type TopProductsResponse = TopProductsQuantityResponse | TopProductsProfitResponse;

// Local row type: what we actually get back at runtime
type AnyRow = {
    month: string;
    productId: string;
    productName?: string;
    quantity?: number;
    profit?: number;
};

// TODO split this function, make it so most of the code can be used for multiple types of charts not just the top products
export function topProductsToChartData(
    resp: TopProductsResponse,
    opts?: {
        /** map productId -> display name; overrides names from rows if provided */
        productLabels?: Record<string, string>;
        /** include totalsPerMonth as an extra dataset */
        includeTotals?: boolean;
        /** force a specific metric; otherwise inferred from rows */
        metric?: MetricKey;
        /** explicit dataset order (productIds) */
        order?: string[];
    }
): ChartData<'bar'> {
    const months: string[] = (resp as any).months ?? [];
    const rows: AnyRow[] = ((resp as any).rows ?? []) as AnyRow[];
    const totalsPerMonth: number[] = (resp as any).totalsPerMonth ?? [];

    // Infer metric if not provided
    const metric: MetricKey =
        opts?.metric ?? (rows.some((r) => typeof r.quantity === 'number') ? 'quantity' : 'profit');

    // month -> index
    const monthIndex = new Map<string, number>(months.map((m, i) => [m, i]));

    // Build name map from rows (productId -> productName). opts overrides later.
    const rowNameMap: Record<string, string> = {};
    for (const r of rows) {
        const pid = r.productId; // read first to avoid narrowing issues
        const name = r.productName;
        if (pid && typeof name === 'string' && name && !rowNameMap[pid]) {
            rowNameMap[pid] = name;
        }
    }
    const labelOf = (pid: string) => opts?.productLabels?.[pid] ?? rowNameMap[pid] ?? pid;

    // Collect product ids
    const productIds = new Set<string>();
    for (const r of rows) if (r.productId) productIds.add(r.productId);

    // Prefill matrix with zeros
    const dataByProduct: Record<string, number[]> = {};
    for (const pid of productIds) dataByProduct[pid] = Array(months.length).fill(0);

    // Fill values (sum duplicates per product/month just in case)
    for (const r of rows) {
        const mi = monthIndex.get(r.month);
        if (mi == null || !r.productId) continue;
        const value = metric === 'quantity' ? (r.quantity ?? 0) : (r.profit ?? 0);
        dataByProduct[r.productId][mi] += value;
    }

    // Decide order of datasets
    let orderedProductIds: string[];
    if (opts?.order?.length) {
        const present = new Set(productIds);
        orderedProductIds = opts.order.filter((id) => present.has(id));
    } else {
        // Default: sort by total (desc)
        orderedProductIds = Array.from(productIds).sort((a, b) => {
            const ta = dataByProduct[a].reduce((s, v) => s + v, 0);
            const tb = dataByProduct[b].reduce((s, v) => s + v, 0);
            return tb - ta;
        });
    }

    const datasets = orderedProductIds.map((pid) => ({
        label: labelOf(pid), // shows productName if available
        data: dataByProduct[pid],
        // stack: 'products',    // uncomment for stacked bars
    }));

    if (opts?.includeTotals && totalsPerMonth.length === months.length) {
        datasets.push({ label: 'Total', data: totalsPerMonth });
    }

    return { labels: months, datasets };
}
