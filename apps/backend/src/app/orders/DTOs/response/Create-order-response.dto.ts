import { CreateOrderResponse, ProductItem } from '@common/Interfaces';
import { OrderDto } from '../base';

export class OrderItemResponseDto {
    productID!: string;
    quantity!: number;

    constructor(item: ProductItem) {
        Object.assign(this, item);
    }
}

export class CreateOrderResponseDto implements CreateOrderResponse {
    order_id: string;
    customer_id!: string;
    total_price!: number;
    items!: OrderItemResponseDto[];

    constructor(order: OrderDto) {
        this.customer_id = order.customer_id!;
        this.total_price = order.total_price!;
        this.items = (order.items || []).map((item) => new OrderItemResponseDto(item));
    }
    created_at: string;
}
