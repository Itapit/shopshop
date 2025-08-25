export const SALES_CUSTOM_ANALYTICS_REPOSITORY = Symbol('SALES_ANALYTICS_REPOSITORY');

export interface ISalesAnalyticsRepository {
    //TODO: add all functions to the interface
    fetchMonthlyProductQuantity( fromYYYYMM: string, toYYYYMM: string,months:string[], timezone: string , k:number ): Promise<any[]>;
    
    fetchMonthlyProductProfit( fromYYYYMM: string, toYYYYMM: string,months:string[], timezone: string , k:number ): Promise<any[]>;

}
