import { TopProductsQuantityResponse } from '@common/Interfaces';
import { ChartData } from 'chart.js';

export function topProductsQtyToChartData(
  resp: TopProductsQuantityResponse,
  opts?: {
    /** optional: map productId -> display name */
    productLabels?: Record<string, string>;
    /** include the totalsPerMonth as an extra dataset (e.g., a line) */
    includeTotals?: boolean;
    /** optional: explicit product order (array of productIds) */
    order?: string[];
  }
): ChartData<'bar'> {
  const { months, rows, totalsPerMonth } = resp;

  // index months for O(1) placement
  const monthIndex = new Map<string, number>(months.map((m, i) => [m, i]));

  // collect product ids
  const productIds = new Set<string>();
  for (const r of rows) productIds.add(r.productId);

  // prefill matrix with zeros
  const dataByProduct: Record<string, number[]> = {};
  for (const pid of productIds) dataByProduct[pid] = Array(months.length).fill(0);

  // fill quantities into the right (product, month) cell
  for (const r of rows) {
    const mi = monthIndex.get(r.month);
    if (mi != null) dataByProduct[r.productId][mi] = r.quantity ?? 0;
  }

  // decide dataset order
  let orderedProductIds: string[];
  if (opts?.order?.length) {
    // keep only products that exist in the response
    const present = new Set(productIds);
    orderedProductIds = opts.order.filter((id) => present.has(id));
  } else {
    // default: sort by total quantity desc
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

  if (opts?.includeTotals && totalsPerMonth?.length === months.length) {
    datasets.push({
      label: 'Total',
      data: totalsPerMonth,
      // (styling can be set in ChartOptions if you want a line overlay, etc.)
    });
  }

  return { labels: months, datasets };
}
