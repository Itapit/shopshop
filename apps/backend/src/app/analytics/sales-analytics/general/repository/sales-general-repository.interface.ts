import { SalesStatsCore, SalesStatsRequestDto } from '../dtos';

export const SALES_ANALYTICS_REPOSITORY = Symbol('SALES_ANALYTICS_REPOSITORY');

export interface ISalesAnalyticsRepository {
    getSalesStats(req: SalesStatsRequestDto): Promise<SalesStatsCore>;
}
