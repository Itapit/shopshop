import { CandleInterval } from '@common/Enums';
import { SalesStatsResponse, toDateObj } from '@common/Interfaces';
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
        const { start, end } = toDateObj(dto.dateRange);
        const interval = dto.candleInterval as CandleInterval;
        const timezone = dto.timezone ?? 'Asia/Jerusalem';

        const core: SalesStatsCore = await this.repo.getSalesGeneralMetrics(start, end, interval, timezone);

        // Echo original request metadata back to client
        return {
            dateRange: dto.dateRange,
            candleInterval: dto.candleInterval,
            timezone,
            candles: core.candles,
            summary: core.summary,
        };
    }
}
