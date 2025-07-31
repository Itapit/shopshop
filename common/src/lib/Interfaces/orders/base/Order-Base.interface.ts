import { ProductItem } from "../../products/base/Product-Item.interface";

export interface OrderBase{
   customerID: string;
   items: ProductItem[];
   totalPrice: number;
}