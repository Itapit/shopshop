import { CartBase } from "@common/Interfaces/cart.interface";
import { ProductItem } from "@common/Interfaces/product-item.interface";

export class CartDto implements CartBase {
    customer_id!: string;
    items!: ProductItem[];
}