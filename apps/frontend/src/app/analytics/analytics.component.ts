import { Component } from '@angular/core';
import { DateRangeOptions } from './date-range-filter';
import { SpecialApi } from './services/special-charts.service';
import { SalesMetric } from '@common/Enums';
import { map } from 'rxjs';
import { topProductsToChartData } from './services/chart-adapters';
import { DateRangeObj } from '@common/Interfaces';


const fmtYYYYMM = (d: Date, tz = 'Asia/Jerusalem') => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit'
  }).formatToParts(d);
  const y = parts.find(p => p.type === 'year')!.value;
  const m = parts.find(p => p.type === 'month')!.value;
  return `${y}-${m}`;
};

@Component({
    selector: 'app-analytics',
    standalone: false,
    templateUrl: './analytics.component.html',
    styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
    constructor(private specialApi: SpecialApi) {}
    DateRangeOptions = DateRangeOptions; // expose the enum to html

    celebrate = true;

    triggerFireworks() {
        this.celebrate = !this.celebrate;
    }

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
                        
                        includeTotals: false,
                    })
                )
            ); 
    loadTopProfit= (q: DateRangeObj) =>
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
                        
                        includeTotals: false,
                    })
                )
            );
}
