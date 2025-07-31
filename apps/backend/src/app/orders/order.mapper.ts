import { OrderBase } from "@common/Interfaces";
import { OrderDto } from "./DTOs";

export function mapOrderToDto(order: OrderBase): OrderDto {
    const orderDto = new OrderDto();
    orderDto.customerID = order.customerID;
    orderDto.items = order.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
    }));
    orderDto.totalPrice = order.totalPrice;
    return orderDto;
}