import { Component, inject, OnInit } from '@angular/core';
import { SalesMetric } from '@common/Enums';
import { DateRangeObj, SalesStatsRequest } from '@common/Interfaces';
import { map } from 'rxjs';
import { CandleIntervalOptions } from '../candle-interval-filter/enums/candle-interval-options.enum';
import { DateRangeOptions } from '../date-range-filter';
import { topProductsToChartData } from './services/chart-data-mapper';
import { SalesAnalyticsCustomService } from './services/sales-analytics-custom.service';
import { SalesAnalyticsFacade } from './store/sales-analytics.facade';

const fmtYYYYMM = (d: Date, tz = 'Asia/Jerusalem') => {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
    }).formatToParts(d);
    const y = parts.find((p) => p.type === 'year')!.value;
    const m = parts.find((p) => p.type === 'month')!.value;
    return `${y}-${m}`;
};

@Component({
    selector: 'app-sales-graphs-list',
    standalone: false,
    templateUrl: './sales-graphs-list.component.html',
    styleUrl: './sales-graphs-list.component.css',
})
export class SalesGraphsListComponent implements OnInit {
    constructor(private specialApi: SalesAnalyticsCustomService) {}
    DateRangeOptions = DateRangeOptions; // expose the enum to html
    CandleIntervalOptions = CandleIntervalOptions;

    private facade = inject(SalesAnalyticsFacade);

    loadTopQty = (q: DateRangeObj) =>
        this.specialApi
            .getTopProductsQuantity({
                metric: SalesMetric.Quantity,
                from: fmtYYYYMM(q.start),
                to: fmtYYYYMM(q.end),
                k: 5,
            })
            .pipe(
                map((resp) =>
                    topProductsToChartData(resp, {
                        metric: 'quantity',
                        includeTotals: false,
                    })
                )
            );
    loadTopProfit = (q: DateRangeObj) =>
        this.specialApi
            .getTopProductsQuantity({
                metric: SalesMetric.Profit,
                from: fmtYYYYMM(q.start),
                to: fmtYYYYMM(q.end),
                k: 5,
            })
            .pipe(
                map((resp) =>
                    topProductsToChartData(resp, {
                        metric: 'profit',
                        includeTotals: false,
                    })
                )
            );

    ngOnInit(): void {
        this.facade.loadSalesGeneralStats({
            dateRange: { start: '2025-06-01T00:00:00.000Z', end: '2025-08-26T23:59:59.999Z' },
            candleInterval: 'day',
            timezone: 'Asia/Jerusalem',
        } as SalesStatsRequest);
    }
}
