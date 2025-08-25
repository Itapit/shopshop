import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ORDERS_REPOSITORY } from './repository/orders-repository.interface';
import { OrdersRepository } from './repository/orders.repository';
import { OrderSchemaFactory } from './repository/orders.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchemaFactory }]), ProductsModule, UsersModule],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository, { provide: ORDERS_REPOSITORY, useExisting: OrdersRepository }],
    exports: [OrdersService , ORDERS_REPOSITORY],
})
export class OrdersModule {}
