import { Module } from '@nestjs/common';
import { CartSchemaFactory } from './repository/carts.schema';
import { CartController } from './cart.controller';
import { CartsService } from './cart.service';
import { CartsRepository } from './repository/carts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CARTS_REPOSITORY } from './repository/carts-reposirtory.interface';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Cart', schema: CartSchemaFactory },
        ]),
        ProductsModule,
    ],
    controllers: [CartController],
    providers: [
        CartsService,
        CartsRepository,
        { provide: CARTS_REPOSITORY, useClass: CartsRepository },
    ],
    exports: [CartsService],
})
export class CartModule {}
