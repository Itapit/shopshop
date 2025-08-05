import { ProductItem } from '@common/Interfaces/products';

export interface CartBase {
    customer_id: string;
    items: ProductItem[];
}
