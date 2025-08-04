import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CartsRepository } from "./repository/carts.repository";
import { AuthGuard } from "../auth/guards/auth.guard";
import { GetCartResponseDto } from "../carts/DTOs/response/Get-cart-by-ID-response";
import { CartsService } from "./cart.service";
import { EditItemInCartResponseDto } from "../carts/DTOs/response/Edit-item-to-cart-response.dto";
import { cartItem } from "@common/Interfaces/carts";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Role } from "@common/Enums";
import { Roles } from "../auth/roles.decorator";
import { ProductItem } from "@common/Interfaces";

@Controller('carts')
export class CartController {
    constructor(private readonly cartService : CartsService) {} 
    
    

    @UseGuards(AuthGuard)
    @Get()
    async getCartByUserId(@Req() req:any ): Promise<GetCartResponseDto>{
        return this.cartService.getCartByCustomerId(req.user.userID);
    } 

    
    @UseGuards(AuthGuard ,RolesGuard)
    @Roles(Role.Client)
    @Put('item')
    async editCartItem(@Req() req: any , @Body() product: ProductItem): Promise<EditItemInCartResponseDto> {
        const cartItem: cartItem = {customer_id: req.user.userID , item: product }
        if (!cartItem.customer_id || !cartItem.item?.product_id) {
        throw new BadRequestException('Missing customer or product ID');
        }
        console.log("in the backend")
        return this.cartService.updateCartItemQuantity(cartItem);
    } 
    @UseGuards(AuthGuard)
    @Delete(':id/clear')
    async clearCart( @Param('id') id: string): Promise<boolean> {
        return this.cartService.clearCart(id);
        
    } 

    
}

    
    
