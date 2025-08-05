import { Role } from '@common/Enums';
import { ProductItem } from '@common/Interfaces';
import { cartItem } from '@common/Interfaces/carts';
import { BadRequestException, Body, Controller, Delete, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { EditItemInCartResponseDto } from '../carts/DTOs/response/Edit-item-to-cart-response.dto';
import { GetCartResponseDto } from '../carts/DTOs/response/Get-cart-by-ID-response';
import { CartsService } from './cart.service';

@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartsService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getCartByUserId(@Req() req: any): Promise<GetCartResponseDto> {
        return this.cartService.getCartByCustomerId(req.user.userID);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Client)
    @Put('item')
    async editCartItem(@Req() req: any, @Body() product: ProductItem): Promise<EditItemInCartResponseDto> {
        const cartItem: cartItem = {
            customer_id: req.user.userID,
            item: product,
        };
        if (!cartItem.customer_id || !cartItem.item?.productID) {
            throw new BadRequestException('Missing customer or product ID');
        }

        return this.cartService.updateCartItemQuantity(cartItem);
    }
    @UseGuards(AuthGuard)
    @Delete()
    async clearCart(@Req() req: any): Promise<boolean> {
        return this.cartService.clearCart(req.user.userID);
    }
    @Get('total')
    @UseGuards(AuthGuard)
    async getCartTotal(@Req() req: any): Promise<{ total: number }> {
        const total = await this.cartService.getCartTotalPrice(req.user.userID);
        return { total };
    }
}
