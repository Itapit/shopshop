import { ProductItem } from "@common/Interfaces/product-item.interface";
import { CartDto } from "../base/cart.dto";
import { EditItemInCartResponse } from "@common/Interfaces/carts/response"

export class CartItemResponseDto {
  product_id!: string;
  quantity!: number;

  constructor(item: ProductItem) {
    Object.assign(this,item);
  }
}

export class EditItemInCartResponseDto implements EditItemInCartResponse {
  customer_id!: string;
  items!: CartItemResponseDto[];

  constructor(cart: CartDto) {
    this.customer_id = cart.customer_id!;
    this.items = (cart.items || []).map(
      (item) => new CartItemResponseDto(item)
    );
  }
}
