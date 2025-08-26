import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { SalesAnalyticsGeneralService } from '../services/sales-analytics-general.service';
import { salesAnalyticsActions } from './sales-analytics.actions';

@Injectable()
export class SalesAnalyticsEffects {
    private actions$ = inject(Actions);
    constructor(private generalService: SalesAnalyticsGeneralService) {}

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
