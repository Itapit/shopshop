import { IsArray, ValidateNested, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EditItemInCartRequest } from '@common/Interfaces/carts/request/Edit-item-in-cart-request.interface';

class CartItemDto {
    @IsString()
    productID!: string;

    @IsInt()
    @Min(1)
    quantity!: number;
}

export class EditItemInCartRequestDto implements EditItemInCartRequest {
    @IsString()
    customer_id!: string;

    @Type(() => CartItemDto)
    item!: CartItemDto;
}
