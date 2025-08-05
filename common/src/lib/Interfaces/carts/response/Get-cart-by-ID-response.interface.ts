import { ProductFull } from '@common/Interfaces/products';
import { CartBase } from '../base';

export interface GetCartByIDResponse {
    customer_id: string;
    items: ProductFull[];
}
