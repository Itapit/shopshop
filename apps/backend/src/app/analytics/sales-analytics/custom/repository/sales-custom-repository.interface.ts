export const SALES_ANALYTICS_REPOSITORY = Symbol('SALES_ANALYTICS_REPOSITORY');

export interface ISalesAnalyticsRepository {
    fetchMonthlyProductQuantity(params: { fromYYYYMM: string; toYYYYMM: string; timezone: string }): Promise<any[]>;
}
