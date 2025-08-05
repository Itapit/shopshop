import { ProductItem } from '../../products/base/Product-Item.interface';

export interface OrderBase {
    customer_id: string;
    items: ProductItem[];
    total_price: number;
}
