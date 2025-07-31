import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './repository/orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchemaFactory } from './repository/orders.schema';
import { ProductsModule } from '../products/products.module'; 
import { UsersModule } from '../users/users.module';           

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchemaFactory }]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService], 
})
export class OrdersModule {}
