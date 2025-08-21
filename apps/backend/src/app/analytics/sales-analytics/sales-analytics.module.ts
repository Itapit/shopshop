import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchemaFactory } from '../../orders/repository/orders.schema';
import { ProductSchemaFactory } from '../../products/repository/product.schema';
import { SALES_ANALYTICS_REPOSITORY } from './custom/repository/sales-custom-repository.interface';
import { SalesAnalyticsRepository } from './custom/repository/sales-custom.repository';
import { SalesCustomController } from './custom/sales-custom.controller';
import { SalesCustomService } from './custom/sales-custom.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Order', schema: OrderSchemaFactory },
            { name: 'Product', schema: ProductSchemaFactory },
        ]),
    ],
    controllers: [SalesCustomController],
    providers: [
        SalesCustomService,
        SalesAnalyticsRepository,
        { provide: SALES_ANALYTICS_REPOSITORY, useClass: SalesAnalyticsRepository },
    ],
    exports: [SalesCustomService],
})
export class SalesAnalyticsModule {}
