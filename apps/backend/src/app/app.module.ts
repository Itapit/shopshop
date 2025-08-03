import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './carts/cart.module';

@Module({
  imports: [ConfigModule.forRoot(), 
            MongooseModule.forRoot(process.env.MONGO_URI),
            UsersModule,
            AuthModule,
            ProductsModule,
            OrdersModule,
            CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
