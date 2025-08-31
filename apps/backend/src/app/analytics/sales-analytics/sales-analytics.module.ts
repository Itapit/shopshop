import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchemaFactory } from '../../orders/repository/orders.schema';
import { ProductsModule } from '../../products/products.module';
import { ProductSchemaFactory } from '../../products/repository/product.schema';
import { SALES_CUSTOM_ANALYTICS_REPOSITORY } from './custom/repository/sales-custom-repository.interface';
import { SalesCustomAnalyticsRepository } from './custom/repository/sales-custom.repository';
import { SalesCustomController } from './custom/sales-custom.controller';
import { SalesCustomService } from './custom/sales-custom.service';
import { SALES_GENERAL_ANALYTICS_REPOSITORY } from './general/repository/sales-general-repository.interface';
import { SalesGeneralAnalyticsRepository } from './general/repository/sales-general.repository';
import { SalesGeneralController } from './general/sales-general.controller';
import { SalesGeneralService } from './general/sales-general.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Order', schema: OrderSchemaFactory },
            { name: 'Product', schema: ProductSchemaFactory },
        ]),
        ProductsModule,
    ],
    controllers: [SalesCustomController, SalesGeneralController],
    providers: [
        SalesCustomService,
        SalesCustomAnalyticsRepository,
        { provide: SALES_CUSTOM_ANALYTICS_REPOSITORY, useExisting: SalesCustomAnalyticsRepository },

        SalesGeneralService,
        SalesGeneralAnalyticsRepository,
        { provide: SALES_GENERAL_ANALYTICS_REPOSITORY, useExisting: SalesGeneralAnalyticsRepository },
    ],
    exports: [SalesCustomService],
})
export class SalesAnalyticsModule {}
