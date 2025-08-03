import { OrderBase, ProductItem } from "@common/Interfaces";

export class OrderDto implements OrderBase {
    customer_id: string;
    items!: ProductItem[];
    total_price: number;
}