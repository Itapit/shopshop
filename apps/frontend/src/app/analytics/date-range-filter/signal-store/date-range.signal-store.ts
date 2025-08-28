import { signalStore, withState } from '@ngrx/signals';
import { withDateRangeLocalComputed } from './date-range.computed';
import { withDateRangeLocalHooks } from './date-range.hooks';
import { withDateRangeLocalMethods } from './date-range.methods';
import { initialLocalDateRangeState } from './date-range.state';

export const DateRangeLocalSignalStore = signalStore(
    withState(initialLocalDateRangeState),
    withDateRangeLocalComputed(),
    withDateRangeLocalMethods(),
    withDateRangeLocalHooks()
);
