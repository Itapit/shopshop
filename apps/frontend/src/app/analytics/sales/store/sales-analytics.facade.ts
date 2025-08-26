import { Injectable, inject } from '@angular/core';
import { SalesStatsRequest } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { salesAnalyticsActions } from './sales-analytics.actions';
import { selectCandles, selectError, selectLoading, selectSummary } from './sales-analytics.selectors';

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
}
