import { SalesStatsCore, SalesStatsRequestDto } from '../dtos';

export const SALES_GENERAL_ANALYTICS_REPOSITORY = Symbol('SALES_ANALYTICS_REPOSITORY');

export interface ISalesGeneralAnalyticsRepository {
    getSalesGeneralMetrics(req: SalesStatsRequestDto): Promise<SalesStatsCore>;
}
