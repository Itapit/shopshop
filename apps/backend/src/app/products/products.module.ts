import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema, ProductSchemaFactory } from './repository/product.schema';
import { PRODUCTS_REPOSITORY } from './repository/products-repository.interface';
import { ProductsRepository } from './repository/products.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: ProductSchema.name, schema: ProductSchemaFactory }])],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        ProductsRepository,
        {
            provide: PRODUCTS_REPOSITORY,
            useClass: ProductsRepository,
        },
    ],
    exports: [ProductsRepository],
})
export class ProductsModule {}
