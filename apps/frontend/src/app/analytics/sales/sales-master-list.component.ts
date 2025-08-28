import { Component, inject } from '@angular/core';
import { SalesMetric } from '@common/Enums';
import { DateRangeObj } from '@common/Interfaces';
import { ChartType } from 'chart.js';
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
    selector: 'app-sales-master-list',
    standalone: false,
    templateUrl: './sales-master-list.component.html',
    styleUrl: './sales-master-list.component.css',
})
export class SalesMasterListComponent {
    constructor(private specialApi: SalesAnalyticsCustomService) {}
    private salesFacade = inject(SalesAnalyticsFacade);

    DateRangeOptions = DateRangeOptions; // expose the enums to html
    CandleIntervalOptions = CandleIntervalOptions;

    loading$ = this.salesFacade.salesAnalyticsLoading$;
    error$ = this.salesFacade.salesAnalyticsError$;

    revenueTitle = 'Revenue';
    revenueDesc = 'Revenue per period.';
    revenueType: ChartType = 'line';
    revenueData$ = this.salesFacade.chartDataForMetric$('grossRevenue', {
        seriesLabels: { grossRevenue: 'Revenue' },
    });

    salesMixTitle = 'Orders, Items & Revenue';
    salesMixDesc = 'Compare orders, items sold, and revenue per period.';
    salesMixType: ChartType = 'bar';
    salesMixData$ = this.salesFacade.chartDataForMetrics$(['ordersCount', 'itemsSold', 'grossRevenue'], {
        seriesLabels: {
            ordersCount: 'Orders',
            itemsSold: 'Items Sold',
            grossRevenue: 'Revenue',
        },
        seriesOrder: ['ordersCount', 'itemsSold', 'grossRevenue'],
    });

    uniqueCustomersTitle = 'Unique Customers';
    uniqueCustomersDesc = 'Number of unique customers per period.';
    uniqueCustomersType: ChartType = 'line';
    uniqueCustomersData$ = this.salesFacade.chartDataForMetric$('uniqueCustomersCount', {
        seriesLabels: { uniqueCustomersCount: 'Unique Customers' },
    });

    newCustomersTitle = 'New Customers';
    newCustomersDesc = 'New customers per period.';
    newCustomersType: ChartType = 'bar';
    newCustomersData = this.salesFacade.chartDataForMetric$('newCustomersCount', {
        seriesLabels: { newCustomersCount: 'New Customers' },
    });

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
}
