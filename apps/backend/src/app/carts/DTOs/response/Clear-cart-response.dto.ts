import { CartDto } from '../base/cart.dto';
import { ClearCartResponse } from '@common/Interfaces/carts/response/Clear-cart-response.interface';
export class ClearCartResponseDto implements ClearCartResponse {
    customer_id!: string;
    items: [] = [];

    constructor(cart: CartDto) {
        this.customer_id = cart.customer_id;
        cart.items = [];
    }
}
