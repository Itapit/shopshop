import { BadRequestException, Injectable } from "@nestjs/common";
import { CartsRepository } from "./repository/carts.repository";
import { ProductsRepository } from "../products/repository/products.repository";
import {GetCartResponseDto} from "../carts/DTOs/response/Get-cart-by-ID-response";
import {EditItemInCartResponseDto} from "../carts/DTOs/response/Edit-item-to-cart-response.dto";
import {EditItemInCartRequestDto} from "../carts/DTOs/request/Edit-item-to-cart-request.dto";
import {CreateCartResponseDto} from "../carts/DTOs/response/Create-cart-response.dto";
import {ClearCartResponseDto} from "../carts/DTOs/response/Clear-cart-response.dto"
import { cartItem } from "@common/Interfaces/carts";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ProductFull } from "@common/Interfaces";
import { ProductDto } from "../products/DTOs";

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
        const fullItems = await Promise.all(
            cart.items.map(async (cartItem) => {const product = await this.productsRepo.findById(cartItem.productID)
                return {
                    productID: product.productID,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: cartItem.quantity,
                    imageUrl: product.imageUrl
                    
                };
            })
        ) 

        cart.items = fullItems;
        
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


        const product = await this.productsRepo.findById(cartItem.item.productID);
        if (!product) {
            throw new Error(`Product with id ${cartItem.item.productID} not found`);
        } 
        if(product.quantity < cartItem.item.quantity) {
            throw new Error(`Insufficient stock for product ${cartItem.item.productID}`);
        }
        const existingCart = await this.cartsRepository.findByCustomerId(cartItem.customer_id);
        if (!existingCart) {
            await this.createCart(cartItem.customer_id);
        }
        if (cartItem.item.quantity <= 0) {
            const cart = await this.cartsRepository.removeItemFromCart(cartItem.customer_id, cartItem.item.productID);
            return new EditItemInCartResponseDto(cart) 
        } 
        if( await this.cartsRepository.getSpecificItemFromCart(cartItem.customer_id, cartItem.item.productID)) {
            const cart = await this.cartsRepository.updateItemQuantity(cartItem.customer_id, cartItem.item.productID, cartItem.item.quantity);
            return new EditItemInCartResponseDto(cart)
        }       
        else{
            const cart = await this.cartsRepository.addItemToCart(cartItem.customer_id, { productID: cartItem.item.productID, quantity: cartItem.item.quantity });
            return new EditItemInCartResponseDto(cart);
        }
    } 
   

    async clearCart(customerId: string): Promise<boolean> {
      const deleted = await this.cartsRepository.deleteCart(customerId);
      return deleted;
   }
}

