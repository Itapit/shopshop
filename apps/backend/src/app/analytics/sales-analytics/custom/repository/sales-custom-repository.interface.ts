export const SALES_Custom_ANALYTICS_REPOSITORY = Symbol('SALES_ANALYTICS_REPOSITORY');

export interface ISalesAnalyticsRepository {
    //TODO: add all functions to the interface
    fetchMonthlyProductQuantity(params: { fromYYYYMM: string; toYYYYMM: string; timezone: string }): Promise<any[]>;
}
