// state/date-range/date-range.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { clampRange, computeRangeForPreset } from '../analytics.helpers';
import { DatePresetKey } from '../date-range/date-range.model';
import * as analyticsActions from './analytics.actions';
@Injectable()
export class AnalyticsDateRangeEffects {
    private actions$ = inject(Actions);

    // Preset -> compute concrete dates -> reducer
    presetToRange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(analyticsActions.setGlobalByPreset),
            filter(({ preset }) => preset !== DatePresetKey.CUSTOM),
            map(({ preset }) => analyticsActions.applyGlobalRange({ range: computeRangeForPreset(preset), preset }))
        )
    );

    // Custom -> sanitize -> reducer
    customToRange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(analyticsActions.setGlobalByCustomRange),
            map(({ range }) =>
                analyticsActions.applyGlobalRange({ range: clampRange(range), preset: DatePresetKey.CUSTOM })
            )
        )
    );
}
