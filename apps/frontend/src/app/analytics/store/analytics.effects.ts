import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { DatePresetKey } from '../date-range-filter/enums';
import { DateRangeMathService } from '../date-range-filter/services/date-range-math.service';
import * as analyticsActions from './analytics.actions';

@Injectable()
export class AnalyticsDateRangeEffects {
    private actions$ = inject(Actions);
    private math = inject(DateRangeMathService);

    private readonly DEFAULT_PRESET = DatePresetKey.LAST_30;

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            map(() => analyticsActions.setGlobalByPreset({ preset: this.DEFAULT_PRESET }))
        )
    );

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
