// src/app/shared/chart-adapter.ts
import { ChartData } from 'chart.js';

type Agg = 'sum' | 'avg' | 'max' | 'min';

export type LongFormChartConfig<T extends Record<string, any>> = {
  /** x-axis field, e.g. 'month' */
  categoryKey: keyof T;
  /** series/group field, e.g. 'productId' */
  seriesKey: keyof T;
  /** numeric value field to plot, e.g. 'quantity' | 'profit' */
  valueKey: keyof T;

  /** optional: display label field for series (pretty name), e.g. 'productName' */
  seriesLabelKey?: keyof T;
  /** optional: override labels per series id */
  seriesLabels?: Record<string, string>;

  /** optional: explicit category order (otherwise derived & sorted) */
  categories?: string[];
  /** optional: explicit series order (otherwise sorted by total desc) */
  seriesOrder?: string[];

  /** optional: extra dataset of totals aligned to categories */
  totals?: number[];

  /** how to aggregate duplicates (default: sum) */
  aggregate?: Agg;
  /** fill missing cells with (default: 0) */
  fill?: number;
};

/**
 * Generic adapter: converts "long-form" rows to Chart.js ChartData.
 * Long-form = one row per (category, series) with a numeric value.
 */
export function toChartDataLong<T extends Record<string, any>>(
  rows: T[],
  cfg: LongFormChartConfig<T>
): ChartData<'bar' | 'line'> {
  const fill = cfg.fill ?? 0;
  const agg: Agg = cfg.aggregate ?? 'sum';

  // categories (x-axis)
  const categories: string[] =
    cfg.categories ??
    Array.from(new Set(rows.map(r => String(r[cfg.categoryKey])))).sort();

  const catIndex = new Map(categories.map((c, i) => [c, i]));

  // collect series ids
  const seriesIds = Array.from(
    new Set(rows.map(r => String(r[cfg.seriesKey])))
  ).filter(Boolean);

  // init matrix
  const bySeries: Record<string, number[]> = {};
  for (const sid of seriesIds) bySeries[sid] = Array(categories.length).fill(fill);

  // avg support (keep counts)
  const counts: Record<string, number[]> | null =
    agg === 'avg' ? Object.fromEntries(seriesIds.map(s => [s, Array(categories.length).fill(0)])) : null;

  // aggregate helper
  const reduceVal = (a: number, b: number) =>
    agg === 'sum' ? a + b :
    agg === 'max' ? Math.max(a, b) :
    agg === 'min' ? Math.min(a, b) :
    /* avg intermediate */ a + b;

  // fill matrix
  for (const r of rows) {
    const sid = String(r[cfg.seriesKey]);
    const cat = String(r[cfg.categoryKey]);
    const i = catIndex.get(cat);
    if (!sid || i == null) continue;

    const raw = r[cfg.valueKey];
    const v = typeof raw === 'number' ? raw : Number(raw ?? 0);

    if (agg === 'avg') {
      bySeries[sid][i] = bySeries[sid][i] + v;
      (counts as any)[sid][i] = (counts as any)[sid][i] + 1;
    } else {
      bySeries[sid][i] = reduceVal(bySeries[sid][i], v);
    }
  }

  if (agg === 'avg') {
    for (const sid of seriesIds) {
      for (let i = 0; i < categories.length; i++) {
        const c = (counts as any)[sid][i];
        if (c > 0) bySeries[sid][i] = bySeries[sid][i] / c;
      }
    }
  }

  // label resolver for series
  const labelOf = (sid: string): string => {
    if (cfg.seriesLabels?.[sid]) return cfg.seriesLabels[sid]!;
    if (cfg.seriesLabelKey) {
      const row = rows.find(x => String(x[cfg.seriesKey]) === sid && x[cfg.seriesLabelKey!]);
      if (row) return String(row[cfg.seriesLabelKey!]);
    }
    return sid;
  };

  // decide order of series (datasets)
  let ordered: string[];
  if (cfg.seriesOrder?.length) {
    const present = new Set(seriesIds);
    ordered = cfg.seriesOrder.filter(id => present.has(id));
  } else {
    ordered = [...seriesIds].sort((a, b) => {
      const ta = bySeries[a].reduce((s, v) => s + v, 0);
      const tb = bySeries[b].reduce((s, v) => s + v, 0);
      return tb - ta;
    });
  }

  // datasets
  const datasets = ordered.map(sid => ({
    label: labelOf(sid),
    data: bySeries[sid],
  }));

  if (cfg.totals && cfg.totals.length === categories.length) {
    datasets.push({ label: 'Total', data: cfg.totals });
  }

  return { labels: categories, datasets };
}
