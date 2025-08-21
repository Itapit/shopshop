import { Role } from '@common/Enums';
import { SalesStatsResponse } from '@common/Interfaces';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard, Roles, RolesGuard } from '../../../auth';
import { SalesStatsRequestDto } from './dtos/request/sales-stats-request.dto';
import { SalesGeneralService } from './sales-general.service';

@Controller('analytics')
export class SalesGeneralController {
    constructor(private readonly svc: SalesGeneralService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('general-metrics')
    async getGeneralMetrics(@Query() req: SalesStatsRequestDto): Promise<SalesStatsResponse> {
        return this.svc.getSalesGeneralMetrics(req);
    }
}
