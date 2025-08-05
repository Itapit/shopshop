import { OrderBase } from '@common/Interfaces';
import { OrderDto } from './DTOs';

export function mapOrderToDto(order: OrderBase): OrderDto {
    const orderDto = new OrderDto();
    orderDto.customer_id = order.customer_id;
    orderDto.items = order.items.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
    }));
    orderDto.total_price = order.total_price;
    return orderDto;
}
