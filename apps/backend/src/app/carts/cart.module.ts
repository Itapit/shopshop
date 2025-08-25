import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';
import { CartController } from './cart.controller';
import { CartsService } from './cart.service';
import { CARTS_REPOSITORY } from './repository/carts-reposirtory.interface';
import { CartsRepository } from './repository/carts.repository';
import { CartSchemaFactory } from './repository/carts.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Cart', schema: CartSchemaFactory }]), ProductsModule],
    controllers: [CartController],
    providers: [CartsService, CartsRepository, { provide: CARTS_REPOSITORY, useExisting: CartsRepository }],
    exports: [CartsService],
})
export class CartModule {}
