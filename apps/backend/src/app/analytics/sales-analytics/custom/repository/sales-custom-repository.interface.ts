export const SALES_CUSTOM_ANALYTICS_REPOSITORY = Symbol('SALES_ANALYTICS_REPOSITORY');

export interface ISalesCustomAnalyticsRepository {
    //TODO: add all functions to the interface
    fetchMonthlyProductQuantity(
        fromYYYYMM: Date,
        toYYYYMM: Date,
        months: string[],
        timezone: string,
        k: number
    ): Promise<any[]>;

    fetchMonthlyProductProfit(
        fromYYYYMM: Date,
        toYYYYMM: Date,
        months: string[],
        timezone: string,
        k: number
    ): Promise<any[]>;
}
