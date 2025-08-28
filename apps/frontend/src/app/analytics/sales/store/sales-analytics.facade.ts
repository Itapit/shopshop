import { inject, Injectable } from '@angular/core';
import { SalesMetrics, SalesStatsRequest } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { filter, Observable } from 'rxjs';
import { NumericKeys } from '../services/candles-graph-mapper';
import { salesAnalyticsActions } from './sales-analytics.actions';
import {
    makeChartDataForMetrics,
    selectCandles,
    selectError,
    selectLoading,
    selectSummary,
} from './sales-analytics.selectors';

const notNull = <T>(v: T | null | undefined): v is T => v != null;

@Injectable({ providedIn: 'root' })
export class SalesAnalyticsFacade {
    private store = inject(Store);

    readonly salesAnalyticsCandles$ = this.store.select(selectCandles).pipe(filter(notNull));

    readonly salesAnalyticsSummary$ = this.store.select(selectSummary).pipe(filter(notNull));

    readonly salesAnalyticsLoading$ = this.store.select(selectLoading).pipe(filter(notNull));

    readonly salesAnalyticsError$ = this.store.select(selectError).pipe();

    loadSalesGeneralStats(salesStatsRequest: SalesStatsRequest) {
        this.store.dispatch(salesAnalyticsActions.loadGeneralStats({ salesStatsRequest }));
    }

    clearSalesStats() {
        this.store.dispatch(salesAnalyticsActions.clearStats());
    }
    chartDataForMetrics$<TType extends ChartType = ChartType>(
        metrics: NumericKeys<SalesMetrics>[],
        opts?: { seriesLabels?: Record<string, string>; seriesOrder?: string[] }
    ): Observable<ChartData<TType>> {
        return this.store.select(makeChartDataForMetrics<TType>(metrics, opts));
    }

    chartDataForMetric$<K extends NumericKeys<SalesMetrics>, TType extends ChartType = ChartType>(
        metric: K,
        opts?: { seriesLabels?: Record<string, string>; seriesOrder?: string[] }
    ): Observable<ChartData<TType>> {
        return this.chartDataForMetrics$<TType>([metric], opts);
    }
}
