export class OrderItemResponseDto {
  product_id!: string;
  quantity!: number;

  constructor(partial: Partial<OrderItemResponseDto>) {
    Object.assign(this, partial);
  }
}

export class CreateOrderResponseDto {
  id!: string;
  customer_id!: string;
  total_price!: number;
  createdAt!: Date;
  items!: OrderItemResponseDto[];

  constructor(partial: Partial<CreateOrderResponseDto>) {
    
    Object.assign(this, partial);

    
    this.items = partial.items?.map(item => new OrderItemResponseDto(item)) || [];
  }
}
