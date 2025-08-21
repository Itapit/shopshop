import { SalesStatsResponse } from '@common/Interfaces';
import { Injectable } from '@nestjs/common';
import { SalesStatsRequestDto } from './dtos/request/sales-stats-request.dto';

@Injectable()
export class SalesGeneralService {
    async getSalesGeneralMetrics(q: SalesStatsRequestDto): Promise<SalesStatsResponse> {}
}
