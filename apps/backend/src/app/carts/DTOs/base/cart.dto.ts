import { CartBase } from '@common/Interfaces/carts';
import { ProductItem } from '@common/Interfaces/products';

export class CartDto implements CartBase {
    customer_id!: string;
    items!: ProductItem[];
}
