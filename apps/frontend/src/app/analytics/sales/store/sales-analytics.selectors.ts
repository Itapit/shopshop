import { SalesMetrics, SalesStatsRequest, toDateStr } from '@common/Interfaces';
import { createSelector } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import {
    selectCandleInterval,
    selectGlobalDate,
    selectTimezone,
} from '../../analytics-master/store/analytics.selectors';
import { candlesToChartDataForMetrics, NumericKeys } from '../services/candles-graph-mapper';
import { salesAnalyticsFeature } from './sales-analytics.reducer';

export const { selectCandles, selectSummary, selectLoading, selectError } = salesAnalyticsFeature;

export const selectSalesRequestFromParent = createSelector(
    selectGlobalDate,
    selectCandleInterval,
    selectTimezone,
    (globalDate, candleInterval, timezone): SalesStatsRequest | null => {
        if (!globalDate || !candleInterval) return null;
        return {
            dateRange: toDateStr(globalDate),
            candleInterval,
            timezone: timezone ?? undefined,
        };
    }
);

export const makeChartDataForMetrics = <TType extends ChartType = ChartType>(
    metrics: NumericKeys<SalesMetrics>[],
    opts?: { seriesLabels?: Record<string, string>; seriesOrder?: string[] }
) =>
    createSelector(
        selectCandles,
        (candles): ChartData<TType> => candlesToChartDataForMetrics<SalesMetrics, TType>(candles, metrics, opts)
    );
