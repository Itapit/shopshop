import { CartDto } from '@common/DTOs/carts/cart.dto';
import { CartBase } from '@common/Interfaces/cart.interface';
import { ProductItem } from '@common/Interfaces/product-item.interface';

export const CARTS_REPOSITORY = Symbol('CARTS_REPOSITORY');

export interface ICartsRepository {
  findByCustomerId(customerId: string): Promise<CartDto | null>;

  create(cartData: Partial<CartBase>): Promise<CartDto>;

  addItemToCart(
    customerId: string,
    item: Partial<ProductItem>
  ): Promise<CartDto>;

  removeItemFromCart(
    customerId: string,
    productId: string
  ): Promise<CartDto | null>;

  updateItemQuantity(
    customerId: string,
    productId: string,
    quantity: number
  ): Promise<CartDto | null>;

  getSpecificItemFromCart(
    customerId: string,
    productId: string
  ): Promise<boolean>;

  deleteCart(customerId: string): Promise<boolean>;
}
