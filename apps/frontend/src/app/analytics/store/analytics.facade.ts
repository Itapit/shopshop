import { Injectable, inject } from '@angular/core';
import { DateRangeObj } from '@common/Interfaces';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { DatePresetKey } from '../date-range-filter/enums';
import * as analyticsActions from './analytics.actions';
import { selectGlobalDateRange, selectGlobalPreset } from './analytics.selectors';

const notNull = <T>(v: T | null | undefined): v is T => v != null;

@Injectable({ providedIn: 'root' })
export class DateRangeFacade {
    private store = inject(Store);

    readonly globalRange$ = this.store.select(selectGlobalDateRange).pipe(filter(notNull));

    readonly globalPreset$ = this.store.select(selectGlobalPreset).pipe(filter(notNull));

    setPreset(preset: DatePresetKey) {
        this.store.dispatch(analyticsActions.setGlobalByPreset({ preset }));
    }

    setCustom(range: DateRangeObj) {
        this.store.dispatch(analyticsActions.setGlobalByCustomRange({ range }));
    }
}
