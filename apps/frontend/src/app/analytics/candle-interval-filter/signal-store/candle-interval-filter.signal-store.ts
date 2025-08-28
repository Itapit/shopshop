import { signalStore, withState } from '@ngrx/signals';
import { withCandleIntervalFilterComputed } from './candle-interval-filter.computed';
import { withCandleIntervalFilterHooks } from './candle-interval-filter.hooks';
import { withCandleIntervalFilterMethods } from './candle-interval-filter.methods';
import { initialLocalCandleIntervalState } from './candle-interval-filter.state';

export const CandleIntervalFilterStore = signalStore(
    withState(initialLocalCandleIntervalState),
    withCandleIntervalFilterComputed(),
    withCandleIntervalFilterMethods(),
    withCandleIntervalFilterHooks()
);
