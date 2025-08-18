import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SalesAnalyticsService } from './sales-analytics.service';
import { TopProductsQuantityRequest } from '@common/Interfaces';
import { TopProductsQuantityResponseDto } from './DTOs/response/top-products-response.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '@common/Enums';

@Controller('analytics')
export class SalesAnalyticsController {
  constructor(private readonly salesAnalyticsService: SalesAnalyticsService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('top-products-quantity')
  async getTopProductsQuantity(
    @Query() dto: TopProductsQuantityRequest
  ): Promise<TopProductsQuantityResponseDto> {
    return this.salesAnalyticsService.fetchMonthlyProductQuantity(dto);
  }

 
}