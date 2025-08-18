// state/date-range/date-range.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { DatePresetKey } from '../date-range-filter/date-range.model';
import { DateRangeMathService } from '../date-range-filter/services/date-range-math.service';
import * as analyticsActions from './analytics.actions';

@Injectable()
export class AnalyticsDateRangeEffects {
    private actions$ = inject(Actions);
    private math = inject(DateRangeMathService);

    presetToRange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(analyticsActions.setGlobalByPreset),
            filter(({ preset }) => preset !== DatePresetKey.CUSTOM),
            map(({ preset }) =>
                analyticsActions.applyGlobalRange({
                    range: this.math.computeRangeForPreset(preset),
                    preset,
                })
            )
        )
    );

    customToRange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(analyticsActions.setGlobalByCustomRange),
            map(({ range }) =>
                analyticsActions.applyGlobalRange({
                    range: this.math.clampRange(range),
                    preset: DatePresetKey.CUSTOM,
                })
            )
        )
    );
}
