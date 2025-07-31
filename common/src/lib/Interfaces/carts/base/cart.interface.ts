import { ProductItem } from "./product-item.interface";

export interface CartBase {
    customer_id: string;
    items: ProductItem[];
   
}