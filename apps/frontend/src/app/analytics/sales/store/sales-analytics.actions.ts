import { SalesStatsRequest, SalesStatsResponse } from '@common/Interfaces';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const salesAnalyticsActions = createActionGroup({
    source: 'Sales Analytics',
    events: {
        'Load General Stats': props<{ salesStatsRequest: SalesStatsRequest }>(),
        'Load General Stats Success': props<{ salesStatsResponse: SalesStatsResponse }>(),
        'Load General Stats Failure': props<{ error: string }>(),
        'Clear Stats': emptyProps(),
    },
});
