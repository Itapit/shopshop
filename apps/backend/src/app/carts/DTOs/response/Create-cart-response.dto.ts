import { ProductItem } from "@common/Interfaces";
import { CartDto } from "../base/cart.dto";
import {CreateCartResponse} from "@common/Interfaces/carts/response/Create-cart-response.interface"

export class CartItemResponseDto  {
  product_id!: string;
  quantity!: number;

  constructor(item: ProductItem) {
    Object.assign(this, item);
  }
}

export class CreateCartResponseDto  implements CreateCartResponse {
  
  customer_id!: string;
  
  items!: CartItemResponseDto[];

  constructor(cart: CartDto) {
    
    Object.assign(this, cart);

    
    this.items = cart.items?.map(item => new CartItemResponseDto(item)) || [];
  }
}
