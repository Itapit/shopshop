import { inject, Injectable } from '@angular/core';
import { CandleInterval } from '@common/Enums';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { DatePresetKey } from '../date-range-filter/enums';
import { DateRangeMathService } from '../date-range-filter/services/date-range-math.service';
import * as analyticsActions from './analytics.actions';

@Injectable()
export class AnalyticsDateRangeEffects {
    private actions$ = inject(Actions);
    private math = inject(DateRangeMathService);

    private readonly DEFAULT_PRESET = DatePresetKey.LAST_7;
    private readonly DEFAULT_CANDLE_INTERVAL = CandleInterval.Day;
    private readonly DEFAULT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

    ngrxOnInitEffects(): Action {
        return analyticsActions.applyDefaultsValues({
            preset: this.DEFAULT_PRESET,
            candleInterval: this.DEFAULT_CANDLE_INTERVAL,
            timezone: this.DEFAULT_TIMEZONE,
        });
    }

    defaultToRange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(analyticsActions.applyDefaultsValues),
            map(({ preset }) =>
                analyticsActions.applyGlobalRange({
                    range: this.math.computeRangeForPreset(preset),
                    preset,
                })
            )
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
