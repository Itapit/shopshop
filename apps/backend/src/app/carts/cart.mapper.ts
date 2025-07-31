import { CartBase } from "@common/Interfaces/cart.interface";
import { CartDto } from "@common/DTOs/carts/cart.dto";
export function mapCartToDto(cart: CartBase): CartDto {
    const cartDto = new CartDto();
    cartDto.customer_id = cart.customer_id;
    cartDto.items = cart.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
    }));
    return cartDto;
}