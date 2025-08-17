import { Module } from '@nestjs/common';
import { SalesAnalyticsController } from './sales-analytics.controller';
import { SalesAnalyticsService } from './sales-analytics.service';
import { SalesAnalyticsRepository } from './repository/sales-analytics.repository';
import { SALES_ANALYTICS_REPOSITORY } from './repository/sales-analytics-repository.interface';

@Module({
  imports: [], 
  controllers: [SalesAnalyticsController],
  providers: [SalesAnalyticsService , SalesAnalyticsRepository , { provide: SALES_ANALYTICS_REPOSITORY, useClass: SalesAnalyticsRepository }],
  exports: [SalesAnalyticsService],
})
export class SalesAnalyticsModule {}