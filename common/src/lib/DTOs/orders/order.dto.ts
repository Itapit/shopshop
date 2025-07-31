import { OrderBase } from "@common/Interfaces/order.interface";
import { ProductItem } from "@common/Interfaces/product-item.interface";

export class OrderDto implements OrderBase {
    customer_id!: string;
    items!: ProductItem[];
    total_price!: number;

}