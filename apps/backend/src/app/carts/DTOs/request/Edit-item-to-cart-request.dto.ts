import { EditItemInCartRequest } from '@common/Interfaces/carts/request/Edit-item-in-cart-request.interface';
import { Type } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

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
