import { CreateOrderResponse, OrderFull } from "@common/Interfaces";

export class CreateOrderResponseDto implements CreateOrderResponse {
  order: OrderFull;
}
