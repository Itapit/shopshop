import { Component } from '@angular/core';
import { SalesMetric } from '@common/Enums';
import { DateRangeObj } from '@common/Interfaces';
import { map } from 'rxjs';
import { CandleIntervalOptions } from '../candle-interval-filter/enums/candle-interval-options.enum';
import { DateRangeOptions } from '../date-range-filter';
import { topProductsToChartData } from './services/chart-data-mapper';
import { SalesAnalyticsCustomService } from './services/sales-analytics-custom.service';

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
    DateRangeOptions = DateRangeOptions; // expose the enum to html
    CandleIntervalOptions = CandleIntervalOptions;

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
