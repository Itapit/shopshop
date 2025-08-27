import { CreateOrderRequest } from '@common/Interfaces';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ProductItemDto } from '../../../products/DTOs';

export class CreateOrderRequestDto implements CreateOrderRequest {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductItemDto)
    items!: ProductItemDto[];
}
