import {
  TopProductsQuantityResponse,
  TopProductsProfitResponse,
} from '@common/Interfaces';
import { ChartData } from 'chart.js';

type MetricKey = 'quantity' | 'profit';
type TopProductsResponse = TopProductsQuantityResponse | TopProductsProfitResponse;

function isQtyRow(r: any): r is { month: string; productId: string; quantity: number } {
  return r && typeof r === 'object' && 'quantity' in r;
}

/**
 * Build Chart.js datasets for Top-K products over months.
 * Works for both quantity and profit responses.
 */
export function topProductsToChartData(
  resp: TopProductsResponse,
  opts?: {
    /** map productId -> display name */
    productLabels?: Record<string, string>;
    /** include totalsPerMonth as an extra dataset */
    includeTotals?: boolean;
    /** force a specific metric; otherwise inferred from rows */
    metric?: MetricKey;
    /** explicit dataset order (productIds) */
    order?: string[];
  }
): ChartData<'bar'> {
  const { months, rows, totalsPerMonth } = resp as any;

  // Infer metric if not provided
  const metric: MetricKey =
    opts?.metric ??
    (rows?.length && isQtyRow(rows[0]) ? 'quantity' : 'profit');

  // Fast index for months
  const monthIndex = new Map<string, number>(months.map((m: string, i: number) => [m, i]));

  // Collect product ids
  const productIds = new Set<string>();
  for (const r of rows) productIds.add(r.productId);

  // Prefill matrix with zeros
  const dataByProduct: Record<string, number[]> = {};
  for (const pid of productIds) dataByProduct[pid] = Array(months.length).fill(0);

  // Fill values into the (product, month) cells
  for (const r of rows) {
    const mi = monthIndex.get(r.month);
    if (mi == null) continue;
    const value = metric === 'quantity' ? (r.quantity ?? 0) : (r.profit ?? 0);
    dataByProduct[r.productId][mi] = value;
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
    label: opts?.productLabels?.[pid] ?? pid,
    data: dataByProduct[pid],
  }));

  // Optional totals overlay
  if (opts?.includeTotals && Array.isArray(totalsPerMonth) && totalsPerMonth.length === months.length) {
    datasets.push({
      label: 'Total',
      data: totalsPerMonth,
    });
  }

  return { labels: months, datasets };
}
