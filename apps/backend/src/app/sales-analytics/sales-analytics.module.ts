import { Module } from '@nestjs/common';
import { SalesAnalyticsController } from './sales-analytics.controller';
import { SalesAnalyticsService } from './sales-analytics.service';
import { SalesAnalyticsRepository } from './repository/sales-analytics.repository';
import { SALES_ANALYTICS_REPOSITORY } from './repository/sales-analytics-repository.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../orders/repository/orders.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema }, 
    ]),
  ],
  controllers: [SalesAnalyticsController],
  providers: [SalesAnalyticsService , SalesAnalyticsRepository , { provide: SALES_ANALYTICS_REPOSITORY, useClass: SalesAnalyticsRepository }],
  exports: [SalesAnalyticsService],
})
export class SalesAnalyticsModule {}