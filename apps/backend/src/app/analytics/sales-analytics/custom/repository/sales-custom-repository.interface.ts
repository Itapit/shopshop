export const SALES_CUSTOM_ANALYTICS_REPOSITORY = Symbol('SALES_ANALYTICS_REPOSITORY');

export interface ISalesAnalyticsRepository {
    //TODO: add all functions to the interface
    fetchMonthlyProduct(params: { fromYYYYMM: string; toYYYYMM: string; timezone: string }): Promise<any[]>;
}
