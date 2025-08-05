import { CartBase } from '@common/Interfaces/carts/base';
import { CartDto } from '../carts/DTOs/base/cart.dto';
export function mapCartToDto(cart: CartBase): CartDto {
    const cartDto = new CartDto();
    cartDto.customer_id = cart.customer_id;
    cartDto.items = cart.items.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
    }));
    return cartDto;
}
