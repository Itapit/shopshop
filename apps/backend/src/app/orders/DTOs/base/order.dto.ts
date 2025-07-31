import { OrderBase, ProductItem } from "@common/Interfaces";

export class OrderDto implements OrderBase {
    customerID: string;
    items!: ProductItem[];
    totalPrice: number;
}