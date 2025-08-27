import { EditItemInCartResponse } from '@common/Interfaces/carts/response';
import { ProductItem } from '@common/Interfaces/products/base';
import { CartDto } from '../base/cart.dto';

export class CartItemResponseDto {
    productID!: string;
    quantity!: number;

    constructor(item: ProductItem) {
        Object.assign(this, item);
    }
}

export class EditItemInCartResponseDto implements EditItemInCartResponse {
    customer_id!: string;
    items!: CartItemResponseDto[];

    constructor(cart: CartDto) {
        this.customer_id = cart.customer_id!;
        this.items = (cart.items || []).map((item) => new CartItemResponseDto(item));
    }
}
