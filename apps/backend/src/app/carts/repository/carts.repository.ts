import { CartBase } from '@common/Interfaces/carts/base';
import { ProductItem } from '@common/Interfaces/products/base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mapCartToDto } from '../cart.mapper';
import { CartDto } from '../DTOs/base/cart.dto';
import { CartDocument } from './carts.schema';

@Injectable()
export class CartsRepository {
    constructor(@InjectModel('Cart') private readonly cartModel: Model<CartDocument>) {}

    async findByCustomerId(customerId: string): Promise<CartDto | null> {
        const cart = await this.cartModel.findOne({ customer_id: customerId }).exec();
        if (!cart) return null;
        return mapCartToDto(cart);
    }

    async create(cartData: Partial<CartBase>): Promise<CartDto> {
        const cart = new this.cartModel(cartData);
        const save = await cart.save();
        return mapCartToDto(save);
    }

    async addItemToCart(customerId: string, item: Partial<ProductItem>): Promise<CartDto> {
        const cart = await this.cartModel
            .findOneAndUpdate({ customer_id: customerId }, { $addToSet: { items: item } }, { new: true, upsert: true })
            .exec();
        return mapCartToDto(cart);
    }

    async removeItemFromCart(customerId: string, productId: string): Promise<CartDto | null> {
        const cart = await this.cartModel
            .findOneAndUpdate(
                { customer_id: customerId },
                { $pull: { items: { productID: productId } } },
                { new: true }
            )
            .exec();
        return cart ? mapCartToDto(cart) : null;
    }

    async updateItemQuantity(customerId: string, productId: string, quantity: number): Promise<CartDto | null> {
        const cart = await this.cartModel
            .findOneAndUpdate(
                { customer_id: customerId, 'items.productID': productId },
                { $set: { 'items.$.quantity': quantity } },
                { new: true }
            )
            .exec();
        return cart ? mapCartToDto(cart) : null;
    }

    async getSpecificItemFromCart(customerId: string, productId: string): Promise<boolean> {
        const cart = await this.cartModel
            .findOne(
                { customer_id: customerId, 'items.productID': productId },
                { items: { $elemMatch: { productID: productId } } }
            )
            .exec();
        return cart ? true : false;
    }

    async deleteCart(customerId: string): Promise<boolean> {
        const result = await this.cartModel.deleteOne({ customer_id: customerId }).exec();
        return result.deletedCount > 0;
    }
}
