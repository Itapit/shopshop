import { SalesStatsRequest, toDateStr } from '@common/Interfaces';
import { createSelector } from '@ngrx/store';
import {
    selectCandleInterval,
    selectGlobalDate,
    selectTimezone,
} from '../../analytics-master/store/analytics.selectors';
import { salesAnalyticsFeature } from './sales-analytics.reducer';

export const { selectCandles, selectSummary, selectLoading, selectError } = salesAnalyticsFeature;

export const selectSalesRequestFromParent = createSelector(
    selectGlobalDate,
    selectCandleInterval,
    selectTimezone,
    (globalDate, candleInterval, timezone): SalesStatsRequest | null => {
        if (!globalDate || !candleInterval) return null;
        return {
            dateRange: toDateStr(globalDate),
            candleInterval,
            timezone: timezone ?? undefined,
        };
    }
);
