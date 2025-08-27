import { CandleInterval } from '@common/Enums';
import { SalesStatsCore } from '../dtos';

export const SALES_GENERAL_ANALYTICS_REPOSITORY = Symbol('SALES_ANALYTICS_REPOSITORY');

export interface ISalesGeneralAnalyticsRepository {
    getSalesGeneralMetrics(
        start: Date,
        end: Date,
        interval: CandleInterval,
        timezone?: string
    ): Promise<SalesStatsCore>;
}
