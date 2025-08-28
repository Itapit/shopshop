import { inject, Injectable } from '@angular/core';
import { SalesMetrics, SalesStatsRequest } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { filter, Observable } from 'rxjs';
import { selectCandleInterval } from '../../analytics-master/store/analytics.selectors';
import { NumericKeys } from '../services/candles-graph-mapper';
import { ChartLabelFormatterService } from '../services/chart-label-fromatter.service';
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
    private prettify = inject(ChartLabelFormatterService);

    readonly salesAnalyticsCandles$ = this.store.select(selectCandles).pipe(filter(notNull));

    readonly salesAnalyticsSummary$ = this.store.select(selectSummary).pipe(filter(notNull));

    readonly salesAnalyticsLoading$ = this.store.select(selectLoading).pipe(filter(notNull));

    readonly salesAnalyticsError$ = this.store.select(selectError).pipe();

    readonly candleInterval$ = this.store.select(selectCandleInterval);

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
        const raw$ = this.store.select(makeChartDataForMetrics<TType>(metrics, opts));
        return this.prettify.withPrettyLabels(raw$, this.candleInterval$);
    }

    chartDataForMetric$<K extends NumericKeys<SalesMetrics>, TType extends ChartType = ChartType>(
        metric: K,
        opts?: { seriesLabels?: Record<string, string>; seriesOrder?: string[] }
    ): Observable<ChartData<TType>> {
        return this.chartDataForMetrics$<TType>([metric], opts);
    }
}
