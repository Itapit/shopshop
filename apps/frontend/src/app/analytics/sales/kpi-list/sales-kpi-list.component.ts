import { Component, inject } from '@angular/core';
import { FormatOptions } from '../../generic-graphs/kpi-tile/format-options.enum';
import { SalesAnalyticsFacade } from '../store/sales-analytics.facade';

@Component({
    selector: 'sales-app-kpi-list',
    standalone: false,
    templateUrl: './sales-kpi-list.component.html',
    styleUrl: './sales-kpi-list.component.css',
})
export class SalesKpiListComponent {
    private facade = inject(SalesAnalyticsFacade);

    summary$ = this.facade.salesAnalyticsSummary$; // SalesSummary (non-null due to facade filter)
    loading$ = this.facade.salesAnalyticsLoading$; // boolean

    // expose enum for the template's @switch
    readonly FormatOptions = FormatOptions;
}
