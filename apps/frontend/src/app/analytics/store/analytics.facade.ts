import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatePresetKey, DateRange } from '../date-range-filter/date-range.model';
import * as analyticsActions from './analytics.actions';
import { selectGlobalDateRange, selectGlobalLabel, selectGlobalPreset } from './analytics.selectors';

@Injectable({ providedIn: 'root' })
export class DateRangeFacade {
    private store = inject(Store);

    globalRange$ = this.store.select(selectGlobalDateRange);
    globalPreset$ = this.store.select(selectGlobalPreset);
    globalLabel$ = this.store.select(selectGlobalLabel);

    setPreset(preset: DatePresetKey) {
        this.store.dispatch(analyticsActions.setGlobalByPreset({ preset }));
    }

    setCustom(range: DateRange) {
        this.store.dispatch(analyticsActions.setGlobalByCustomRange({ range }));
    }
}
