import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatePresetKey } from '../date-range-filter/enums';
import { DateRange } from '../date-range-filter/interfaces';
import * as analyticsActions from './analytics.actions';
import { selectGlobalDateRange, selectGlobalPreset } from './analytics.selectors';

@Injectable({ providedIn: 'root' })
export class DateRangeFacade {
    private store = inject(Store);

    globalRange$ = this.store.select(selectGlobalDateRange);
    globalPreset$ = this.store.select(selectGlobalPreset);

    setPreset(preset: DatePresetKey) {
        this.store.dispatch(analyticsActions.setGlobalByPreset({ preset }));
    }

    setCustom(range: DateRange) {
        this.store.dispatch(analyticsActions.setGlobalByCustomRange({ range }));
    }
}
