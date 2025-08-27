import { withHooks } from '@ngrx/signals';

export const withCandleIntervalFilterHooks = () =>
    withHooks({
        onInit: () => {
            // no-op for now
        },
        onDestroy: () => {
            // no-op for now
        },
    });
