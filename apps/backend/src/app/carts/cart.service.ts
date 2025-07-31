import { BadRequestException, Injectable } from "@nestjs/common";
import { CartsRepository } from "./repository/carts.repository";
import { ProductsRepository } from "../products/repository/products.repository";
import { CartDto } from "@common/DTOs/carts/cart.dto";
import { map } from "rxjs";
import { mapCartToDto } from "./cart.mapper";
import {GetCartResponseDto} from "@common/DTOs/carts/Get-cart-by-ID-response";
import {EditItemInCartResponseDto} from "@common/DTOs/carts/Edit-item-to-cart-response.dto";
import {EditItemInCartRequestDto} from "@common/DTOs/carts/Edit-item-to-cart-request.dto";
import {CreateCartResponseDto} from "@common/DTOs/carts/Create-cart-response.dto";
import {ClearCartResponseDto} from "@common/DTOs/carts/Clear-cart-response.dto"
import { cartItem } from "@common/Interfaces";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class CartsService {
    constructor(private readonly cartsRepository: CartsRepository , 
        private readonly productsRepo: ProductsRepository
    ) {} 

    async getCartByCustomerId(customerId: string): Promise<GetCartResponseDto | null> {

        const cart = await this.cartsRepository.findByCustomerId(customerId);
        if (!cart) {
            return null;
        } 
        return new GetCartResponseDto(cart);
    } 

    async createCart(customerId: string): Promise<CreateCartResponseDto> {
        const cartData = { customer_id: customerId, items: [] };
        const cart = await this.cartsRepository.create(cartData);
        return new CreateCartResponseDto(cart)
    }

    async updateCartItemQuantity(cartItem: cartItem): Promise<EditItemInCartResponseDto | null> { 
        
        const dto = plainToInstance(EditItemInCartRequestDto, cartItem);

  
        const errors = await validate(dto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }


        const product = await this.productsRepo.findById(cartItem.item.product_id);
        if (!product) {
            throw new Error(`Product with id ${cartItem.item.product_id} not found`);
        } 
        if(product.quantity < cartItem.item.quantity) {
            throw new Error(`Insufficient stock for product ${cartItem.item.product_id}`);
        }
        const existingCart = await this.cartsRepository.findByCustomerId(cartItem.customer_id);
        if (!existingCart) {
            await this.createCart(cartItem.customer_id);
        }
        if (cartItem.item.quantity <= 0) {
            const cart = await this.cartsRepository.removeItemFromCart(cartItem.customer_id, cartItem.item.product_id);
            return new EditItemInCartResponseDto(cart) 
        } 
        if( await this.cartsRepository.getSpecificItemFromCart(cartItem.customer_id, cartItem.item.product_id)) {
            const cart = await this.cartsRepository.updateItemQuantity(cartItem.customer_id, cartItem.item.product_id, cartItem.item.quantity);
            return new EditItemInCartResponseDto(cart)
        }       
        else{
            const cart = await this.cartsRepository.addItemToCart(cartItem.customer_id, { product_id: cartItem.item.product_id, quantity: cartItem.item.quantity });
            return new EditItemInCartResponseDto(cart);
        }
    } 
   

    async clearCart(customerId: string): Promise<boolean> {
      const deleted = await this.cartsRepository.deleteCart(customerId);
      return deleted;
   }
}

