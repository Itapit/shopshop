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

type NumMatrix = Record<string, number[]>;

function computeCategories<T extends Record<string, any>>(
  rows: T[],
  key: keyof T,
  explicit?: string[],
) {
  const categories =
    explicit ??
    Array.from(new Set(rows.map((r) => String(r[key])))).sort();

  const catIndex = new Map(categories.map((c, i) => [c, i]));
  return { categories, catIndex };
}

function collectSeriesIds<T extends Record<string, any>>(
  rows: T[],
  seriesKey: keyof T,
) {
  return Array.from(
    new Set(rows.map((r) => String(r[seriesKey]))),
  ).filter(Boolean);
}

function initMatrix(seriesIds: string[], cols: number, fill: number): NumMatrix {
  const by: NumMatrix = {};
  for (const id of seriesIds) by[id] = Array(cols).fill(fill);
  return by;
}

function maybeInitCounts(
  agg: Agg,
  seriesIds: string[],
  cols: number,
): NumMatrix | undefined {
  if (agg !== 'avg') return;
  const counts: NumMatrix = {};
  for (const id of seriesIds) counts[id] = Array(cols).fill(0);
  return counts;
}

function reducerFor(agg: Agg) {
  return (a: number, b: number) =>
    agg === 'sum'
      ? a + b
      : agg === 'max'
      ? Math.max(a, b)
      : agg === 'min'
      ? Math.min(a, b)
      : a + b;
}

function aggregateRows<T extends Record<string, any>>(
  rows: T[],
  cfg: LongFormChartConfig<T>,
  catIndex: Map<string, number>,
  bySeries: NumMatrix,
  counts?: NumMatrix,
) {
  const agg = cfg.aggregate ?? 'sum';
  const reduceVal = reducerFor(agg);

  for (const r of rows) {
    const sid = String(r[cfg.seriesKey]);
    const cat = String(r[cfg.categoryKey]);
    const i = catIndex.get(cat);
    if (!sid || i == null) continue;

    const raw = r[cfg.valueKey];
    const v = typeof raw === 'number' ? raw : Number(raw ?? 0);

    if (agg === 'avg') {
      bySeries[sid][i] = bySeries[sid][i] + v;
      if (counts) counts[sid][i] = counts[sid][i] + 1;
    } else {
      bySeries[sid][i] = reduceVal(bySeries[sid][i], v);
    }
  }
}

function finalizeAverages(bySeries: NumMatrix, counts?: NumMatrix) {
  if (!counts) return;
  for (const sid of Object.keys(bySeries)) {
    const row = bySeries[sid];
    const cnt = counts[sid];
    for (let i = 0; i < row.length; i++) {
      if (cnt[i] > 0) row[i] = row[i] / cnt[i];
    }
  }
}

function makeSeriesLabelResolver<T extends Record<string, any>>(
  rows: T[],
  cfg: LongFormChartConfig<T>,
) {
  return (sid: string): string => {
    if (cfg.seriesLabels?.[sid]) return cfg.seriesLabels[sid]!;
    if (cfg.seriesLabelKey) {
      const row = rows.find(
        (x) => String(x[cfg.seriesKey]) === sid && x[cfg.seriesLabelKey!],
      );
      if (row) return String(row[cfg.seriesLabelKey!]);
    }
    return sid;
  };
}

function orderSeries(
  seriesIds: string[],
  bySeries: NumMatrix,
  explicit?: string[],
) {
  if (explicit?.length) {
    const present = new Set(seriesIds);
    return explicit.filter((id) => present.has(id));
  }
  
  return [...seriesIds].sort((a, b) => {
    const ta = bySeries[a].reduce((s, v) => s + v, 0);
    const tb = bySeries[b].reduce((s, v) => s + v, 0);
    return tb - ta;
  });
}

function buildDatasets(
  orderedIds: string[],
  bySeries: NumMatrix,
  labelOf: (sid: string) => string,
  categoriesLen: number,
  totals?: number[],
) {
  const datasets = orderedIds.map((sid) => ({
    label: labelOf(sid),
    data: bySeries[sid],
  }));

  if (totals && totals.length === categoriesLen) {
    datasets.push({ label: 'Total', data: totals });
  }
  return datasets;
}


export function toChartDataLong<T extends Record<string, any>>(
  rows: T[],
  cfg: LongFormChartConfig<T>,
): ChartData<'bar' | 'line'> {
  const fill = cfg.fill ?? 0;
  const agg: Agg = cfg.aggregate ?? 'sum';

  
  const { categories, catIndex } = computeCategories(rows, cfg.categoryKey, cfg.categories);

  
  const seriesIds = collectSeriesIds(rows, cfg.seriesKey);
  const bySeries = initMatrix(seriesIds, categories.length, fill);
  const counts = maybeInitCounts(agg, seriesIds, categories.length);

  
  aggregateRows(rows, cfg, catIndex, bySeries, counts);
  finalizeAverages(bySeries, counts);

  
  const labelOf = makeSeriesLabelResolver(rows, cfg);
  const ordered = orderSeries(seriesIds, bySeries, cfg.seriesOrder);

  
  const datasets = buildDatasets(ordered, bySeries, labelOf, categories.length, cfg.totals);

  return { labels: categories, datasets };
}
