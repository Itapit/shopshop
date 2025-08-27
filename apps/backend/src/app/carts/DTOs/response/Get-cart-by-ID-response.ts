import { ProductFull } from '@common/Interfaces';
import { GetCartByIDResponse } from '@common/Interfaces/carts/response/Get-cart-by-ID-response.interface';
import { CartDto } from '../base/cart.dto';

export class CartItemResponseDto implements ProductFull {
    productID: string;
    name!: string;
    description!: string;
    price!: number;
    quantity!: number;
    imageUrl!: string;

    constructor(partial: Partial<CartItemResponseDto>) {
        Object.assign(this, partial);
    }
}

export class GetCartResponseDto implements GetCartByIDResponse {
    customer_id!: string;
    items!: CartItemResponseDto[];

    constructor(partial: CartDto) {
        this.customer_id = partial.customer_id!;
        this.items = (partial.items || []).map((item) => new CartItemResponseDto(item));
    }
}
