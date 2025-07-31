import { CreateOrderResponse, OrderBase, OrderFull } from "@common/Interfaces";

export class CreateOrderResponseDto implements CreateOrderResponse {
  order: OrderFull; 

  constructor(dto: OrderBase){
    this.order.customerID = dto.customerID
    this.order.items = dto.items
    this.order.totalPrice = dto.totalPrice
  }


}
