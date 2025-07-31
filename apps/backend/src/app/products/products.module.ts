import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema, ProductSchemaFactory } from './repository/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsRepository } from './repository/products.repository';
import { PRODUCTS_REPOSITORY } from './repository/products-repository.interface';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductSchema.name, schema: ProductSchemaFactory }])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: ProductsRepository,
    }
  ],
  exports: [ProductsRepository]
})
export class ProductsModule {}
