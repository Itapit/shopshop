import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductSchema, ProductDocument } from './product.schema';
import { IProductsRepository } from './products-repository.interface';
import { ProductBase } from 'common/src/lib/Interfaces/product.interface';
import { ProductSortBy } from 'common/src/lib/Enums/sort-by.enum';

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(@InjectModel(ProductSchema.name) private readonly productModel: Model<ProductDocument>) {}

    async getPaginatedProducts(
        page: number,
        limit: number,
        sortBy: string = ProductSortBy.CREATED_AT
    ): Promise<{ products: ProductBase[]; totalCount: number }> {
        const skip = (page - 1) * limit;
        
        const sort: Record<string, 1 | -1> = {
            [sortBy]: 1,
        };

        const [docs, totalCount] = await Promise.all([
            this.productModel.find().skip(skip).limit(limit).sort(sort).exec(),
            this.productModel.countDocuments().exec(),
        ]);

        const products = docs.map(this.toProduct);

        return { products, totalCount };
    }

    async findById(id: string): Promise<ProductBase | null> {
        const doc = await this.productModel.findById(id).exec();
        return doc ? this.toProduct(doc) : null;
    }

    async create(product: ProductBase): Promise<ProductBase> {
        const created = new this.productModel(product);
        const saved = await created.save();
        return this.toProduct(saved);
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
