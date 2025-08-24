import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchemaFactory } from '../orders/repository/orders.schema';
import { ProductSchemaFactory } from '../products/repository/product.schema';
import { SALES_ANALYTICS_REPOSITORY } from './repository/sales-analytics-repository.interface';
import { SalesAnalyticsRepository } from './repository/sales-analytics.repository';
import { SalesAnalyticsController } from './sales-analytics.controller';
import { SalesAnalyticsService } from './sales-analytics.service';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Order', schema: OrderSchemaFactory },
            { name: 'Product', schema: ProductSchemaFactory },
        ]),
        ProductsModule
    ],
    controllers: [SalesAnalyticsController],
    providers: [
        SalesAnalyticsService,
        SalesAnalyticsRepository,
        { provide: SALES_ANALYTICS_REPOSITORY, useClass: SalesAnalyticsRepository },
    ],
    exports: [SalesAnalyticsService],
})
export class SalesAnalyticsModule {}
