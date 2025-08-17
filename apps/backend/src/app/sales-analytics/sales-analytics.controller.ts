import { Controller, Get } from '@nestjs/common';
import { SalesAnalyticsService } from './sales-analytics.service';

@Controller('analytics')
export class SalesAnalyticsController {
  constructor(private readonly salesAnalyticsService: SalesAnalyticsService) {}

 
}