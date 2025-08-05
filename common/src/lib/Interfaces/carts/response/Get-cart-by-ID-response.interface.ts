import { ProductFull } from '@common/Interfaces/products';

export interface GetCartByIDResponse {
    customer_id: string;
    items: ProductFull[];
}
