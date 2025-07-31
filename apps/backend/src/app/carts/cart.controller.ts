import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CartsRepository } from "./repository/carts.repository";
import { AuthGuard } from "../auth/guards/auth.guard";
import { GetCartResponseDto } from "@common/DTOs/carts/Get-cart-by-ID-response";
import { CartsService } from "./cart.service";
import { EditItemInCartResponseDto } from "@common/DTOs/carts/Edit-item-to-cart-response.dto";
import { cartItem } from "@common/Interfaces";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Role } from "@common/Enums";
import { Roles } from "../auth/roles.decorator";

@Controller('carts')
export class CartController {
    constructor(private readonly cartService : CartsService) {} 
    
    

    @UseGuards(AuthGuard)
    @Get(':id')
    async getCartByUserId(@Param('id') id:string ): Promise<GetCartResponseDto>{
        return this.cartService.getCartByCustomerId(id);
    } 

    
    @UseGuards(AuthGuard ,RolesGuard)
    @Roles(Role.Client)
    @Put('item')
    async editCartItem(@Body() cartItem: cartItem): Promise<EditItemInCartResponseDto> {
        console.log('Received cartItem:', cartItem);
        if (!cartItem.customer_id || !cartItem.item?.product_id) {
        throw new BadRequestException('Missing customer or product ID');
        }

        return this.cartService.updateCartItemQuantity(cartItem);
    } 
    @UseGuards(AuthGuard)
    @Delete(':id/clear')
    async clearCart( @Param('id') id: string): Promise<boolean> {
        return this.cartService.clearCart(id);
        
    } 

    
}

    
    
