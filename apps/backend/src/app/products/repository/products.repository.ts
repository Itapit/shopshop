import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductSchema, ProductDocument } from './product.schema';
import { IProductsRepository } from './products-repository.interface';
import { ProductSortBy } from '@common/Enums';
import { ProductBase } from '@common/Interfaces';
import { ProductDto } from '@common/DTOs';
import { mapToProductDto } from '../product.mapper';


@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(@InjectModel(ProductSchema.name) private readonly productModel: Model<ProductDocument>) {}

    async getPaginatedProducts(
        page: number,
        limit: number,
        sortBy: string = ProductSortBy.CREATED_AT
    ): Promise<{ products: ProductDto[]; totalCount: number }> {
        const skip = (page - 1) * limit;
        
        const sort: Record<string, 1 | -1> = {
            [sortBy]: 1,
        };

        const [docs, totalCount] = await Promise.all([
            this.productModel.find().skip(skip).limit(limit).sort(sort).exec(),
            this.productModel.countDocuments().exec(),
        ]);

        const products = docs.map(mapToProductDto);

        return { products, totalCount };
    }

    async findById(id: string): Promise<ProductDto | null> {
        const doc = await this.productModel.findById(id).exec();
        if (!doc){ 
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return doc ? mapToProductDto(doc) : null;
    }

    async create(product: ProductBase): Promise<ProductBase> {
        const created = new this.productModel(product);
        const saved = await created.save();
        return this.toProduct(saved);
    }
    
    async deleteById(id: string): Promise<boolean> {
        const result = await this.productModel.deleteOne({ _id:id }).exec();
        return result.deletedCount > 0;
    }

    private toProduct(doc: ProductDocument): ProductBase {
        return {
            name: doc.name,
            description: doc.description,
            price: doc.price,
            quantity: doc.quantity,
            imageUrl: doc.imageUrl,
        };
    }
}
