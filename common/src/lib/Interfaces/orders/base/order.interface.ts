import { ProductItem } from "./product-item.interface";

export interface OrderBase{
   
   customer_id: string;
   items: ProductItem[];
   total_price: number;
   
  

}