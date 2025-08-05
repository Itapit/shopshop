import { IsArray, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderRequest } from '@common/Interfaces';
import { ProductItemDto } from '../../../products/DTOs';

export class CreateOrderRequestDto implements CreateOrderRequest {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductItemDto)
    items!: ProductItemDto[];
}
