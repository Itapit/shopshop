import {GetCartByIDResponse} from "@common/Interfaces/carts/response/Get-cart-by-ID-response.interface"

export class CartItemResponseDto {
  product_id!: string;
  quantity!: number;

  constructor(partial: Partial<CartItemResponseDto>) {
    Object.assign(this, partial);
  }
}

export class GetCartResponseDto implements GetCartByIDResponse{
  customer_id!: string;
  items!: CartItemResponseDto[];

  constructor(partial: Partial<GetCartResponseDto>) {
    this.customer_id = partial.customer_id!;
    this.items = (partial.items || []).map(
      (item) => new CartItemResponseDto(item)
    );
  }
}
