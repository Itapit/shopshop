import { Role } from '@common/Enums';
import { TopProductsQuantityRequest } from '@common/Interfaces';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import { TopProductsProfitResponseDto } from './DTOs/response/top-products-profit-response.dto';
import { TopProductsQuantityResponseDto } from './DTOs/response/top-products-quantity-response.dto';
import { SalesCustomService } from './sales-custom.service';

@Controller('analytics')
export class SalesCustomController {
    constructor(private readonly salesCustomService: SalesCustomService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('top-products-quantity')
    async getTopProductsByMetric(
        @Query() dto: TopProductsQuantityRequest
    ): Promise<TopProductsQuantityResponseDto | TopProductsProfitResponseDto> {
        return this.salesCustomService.fetchMonthlyProductQuantity(dto);
    }
}
