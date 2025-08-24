import { SalesStatsResponse } from '@common/Interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { SalesStatsCore, SalesStatsRequestDto } from './dtos';
import {
    ISalesGeneralAnalyticsRepository,
    SALES_GENERAL_ANALYTICS_REPOSITORY,
} from './repository/sales-general-repository.interface';

@Injectable()
export class SalesGeneralService {
    constructor(
        @Inject(SALES_GENERAL_ANALYTICS_REPOSITORY)
        private readonly repo: ISalesGeneralAnalyticsRepository
    ) {}

    async getSalesGeneralMetrics(dto: SalesStatsRequestDto): Promise<SalesStatsResponse> {
        const core: SalesStatsCore = await this.repo.getSalesGeneralMetrics(dto);

        return {
            dateRange: dto.dateRange,
            candleInterval: dto.candleInterval,
            timezone: dto.timezone ?? 'Asia/Jerusalem',
            candles: core.candles,
            summery: core.summery,
        };
    }
}
