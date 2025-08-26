import { MonthlyProfit } from '@common/Interfaces';

export class MonthlyProfitDto implements MonthlyProfit {
    month: string;
    productId: string;
    profit: number;

    constructor(month: string, productId: string, profit: number) {
        this.month = month;
        this.productId = productId;
        this.profit = profit;
    }
}
