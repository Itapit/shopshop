import { inject, Injectable } from '@angular/core';
import { SalesStatsRequest } from '@common/Interfaces';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { analyticsActions } from '../../analytics-master/store/analytics.actions';
import { SalesAnalyticsGeneralService } from '../services/sales-analytics-general.service';
import { salesAnalyticsActions } from './sales-analytics.actions';
import { selectSalesRequestFromParent } from './sales-analytics.selectors';

@Injectable()
export class SalesAnalyticsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    constructor(private generalService: SalesAnalyticsGeneralService) {}

    onParentParamsChanged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(analyticsActions.applyGlobalRange, analyticsActions.setGlobalCandleInterval),
            switchMap(() =>
                this.store.select(selectSalesRequestFromParent).pipe(
                    filter((req): req is SalesStatsRequest => !!req), // waits until parent state is ready
                    take(1),
                    map((req) => salesAnalyticsActions.loadGeneralStats({ salesStatsRequest: req }))
                )
            )
        )
    );

    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(salesAnalyticsActions.loadGeneralStats),
            switchMap(({ salesStatsRequest }) =>
                this.generalService.loadGeneralSalesStats(salesStatsRequest).pipe(
                    map((salesStatsResponse) => salesAnalyticsActions.loadGeneralStatsSuccess({ salesStatsResponse })),
                    catchError((e) =>
                        of(salesAnalyticsActions.loadGeneralStatsFailure({ error: e?.message ?? 'Unknown error' }))
                    ),
                    takeUntil(this.actions$.pipe(ofType(salesAnalyticsActions.clearStats)))
                )
            )
        )
    );

    loadSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(salesAnalyticsActions.loadGeneralStatsSuccess),
                tap(() => {
                    // move the firework here?
                })
            ),
        { dispatch: false }
    );

    loadFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(salesAnalyticsActions.loadGeneralStatsFailure),
                tap(({ error }) => {
                    // toast error?
                })
            ),
        { dispatch: false }
    );

    clear$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(salesAnalyticsActions.clearStats),
                tap(() => {
                    // optional cleanup beyond reducer reset
                })
            ),
        { dispatch: false }
    );
}
