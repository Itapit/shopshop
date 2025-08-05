import { OrderFullDto } from './DTOs/base/orderFull.dto';
import { OrderFull } from '@common/Interfaces';

export function mapOrderFullToDto(order: OrderFull): OrderFullDto {
    const dto = new OrderFullDto();
    dto.order_id = order.order_id;
    dto.customer_id = order.customer_id;
    dto.items = order.items.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
    }));
    dto.total_price = order.total_price;
    dto.created_at = order.created_at;
    return dto;
}
