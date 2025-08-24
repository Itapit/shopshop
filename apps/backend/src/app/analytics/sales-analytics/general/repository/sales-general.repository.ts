import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import { CandleInterval } from '@common/Enums';
import { SalesStatsCore } from '../dtos';

import { OrderDocument } from 'apps/backend/src/app/orders/repository/orders.schema';
import { emptySummery, salesGeneralPipe } from './pipes/sales-wrapper.pipe';

@Injectable()
export class SalesGeneralAnalyticsRepository {
    constructor(@InjectModel('Order') private readonly orders: Model<OrderDocument>) {}

    async getSalesGeneralMetrics(
        start: Date,
        end: Date,
        interval: CandleInterval,
        timezone?: string
    ): Promise<SalesStatsCore> {
        const pipeline: PipelineStage[] = salesGeneralPipe(start, end, interval, timezone);

        const docs = await this.orders
            .aggregate(pipeline, { allowDiskUse: true, maxTimeMS: 25_000 })
            .read('secondaryPreferred')
            .exec();

        return (docs?.[0] as SalesStatsCore) ?? { summery: emptySummery(), candles: [] };
    }
}
