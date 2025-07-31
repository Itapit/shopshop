import { IsArray, ValidateNested, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {CreateOrderRequest, } from "@common/Interfaces"

class OrderItemDto {
  
  
  @IsString()
  product_id!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderRequestDto implements CreateOrderRequest  {
  customer_id: string;
  total_price: number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}
