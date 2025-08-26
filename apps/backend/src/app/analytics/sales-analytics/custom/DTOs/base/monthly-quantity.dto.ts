import { MonthlyQuantity } from '@common/Interfaces';

export class MonthlyQuantityDto implements MonthlyQuantity {
    month!: string;
    productId!: string;
    quantity!: number;

    constructor(month: string, productId: string, quantity: number) {
        this.month = month;
        this.productId = productId;
        this.quantity = quantity;
    }
}
