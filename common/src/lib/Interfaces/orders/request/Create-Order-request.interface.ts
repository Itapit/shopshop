import { ProductItem } from '@common/Interfaces/products';

export interface CreateOrderRequest {
    items: ProductItem[];
}
