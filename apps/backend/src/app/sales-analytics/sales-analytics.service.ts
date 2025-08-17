import { Injectable } from '@nestjs/common';
import { SalesAnalyticsRepository } from './repository/sales-analytics.repository';

@Injectable()
export class SalesAnalyticsService {
  constructor(private readonly salesAnalyticsRepository: SalesAnalyticsRepository) {}

  
}