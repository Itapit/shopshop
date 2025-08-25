import { Component, inject, OnInit } from '@angular/core';
import { SalesStatsRequest } from '@common/Interfaces';
import { SalesAnalyticsFacade } from './sales-store/sales-analytics.facade';

@Component({
    selector: 'app-sales-graphs-list',
    standalone: false,
    templateUrl: './sales-graphs-list.component.html',
    styleUrl: './sales-graphs-list.component.css',
})
export class SalesGraphsListComponent implements OnInit {
    private facade = inject(SalesAnalyticsFacade);

    ngOnInit(): void {
        this.facade.loadSalesGeneralStats({
            dateRange: { start: '2025-06-01T00:00:00.000Z', end: '2025-08-26T23:59:59.999Z' },
            candleInterval: 'day',
            timezone: 'Asia/Jerusalem',
        } as SalesStatsRequest);
    }
}
