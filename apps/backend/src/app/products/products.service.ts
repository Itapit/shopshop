import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GetProductsListDTO } from 'common/src/lib/DTOs/Get-Products-list.dto';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { GetProductsListResponseDTO } from 'common/src/lib/DTOs/Get-Products-list-response.dto';
import { ProductSortBy } from 'common/src/lib/Enums/sort-by.enum';
import { ProductDto } from 'common/src/lib/DTOs/Product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}
    
    async GetProductsList(dto: GetProductsListDTO): Promise<GetProductsListResponseDTO> {
        const {page = 1, limit = 10, sortBy} = dto
        const skip = (page - 1) * limit;

        
        const sort: Record<string, 1> = {
            [sortBy ?? ProductSortBy.CREATED_AT]: 1,
        };
        
        const [products, totalCount] = await Promise.all([
            this.productModel.find().skip(skip).limit(limit).sort(sort).exec(),
            this.productModel.countDocuments(),
        ]);

        const productDtos: ProductDto[] = products.map((product) => ({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            imageUrl: product.imageUrl,
        }));

        return {
            data: productDtos,
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
        };
    }
}
