import { ProductItem } from '@common/Interfaces/products';
import { OrderBase } from '../base';

export interface CreateOrderRequest {
    items: ProductItem[];
}
