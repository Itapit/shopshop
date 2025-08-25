import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class SalesAnalyticsEffects {
    private actions$ = inject(Actions);
    // constructor(private generalStatsService: GeneralStatsService){}

    // load$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(salesAnalyticsActions.loadGeneralStats),
    //         switchMap(() =>
    //             this.generalStatsService

    //             )
    //         )

    //     )
    // )
}
