import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import { CandleInterval } from '@common/Enums';
import { SalesSummery, toDateObj } from '@common/Interfaces';
import { SalesStatsCore, SalesStatsRequestDto } from '../dtos';

import { OrderDocument } from 'apps/backend/src/app/orders/repository/orders.schema';
import { salesCandlesPipe, salesSummaryPipe } from './pipes';

@Injectable()
export class SalesAnalyticsRepository {
    constructor(@InjectModel('orders') private readonly orders: Model<OrderDocument>) {}

    async getSalesStats(req: SalesStatsRequestDto): Promise<SalesStatsCore> {
        const { dateRange, candleInterval, timezone } = req;

        // Parse incoming strings to Date objects
        const { start, end } = toDateObj(dateRange);

        const summaryStages = salesSummaryPipe(start, end) as PipelineStage.FacetPipelineStage[];
        const candlesStages = salesCandlesPipe(
            start,
            end,
            candleInterval as CandleInterval,
            timezone
        ) as PipelineStage.FacetPipelineStage[];

        const pipeline: PipelineStage[] = [
            {
                $facet: {
                    summary: summaryStages,
                    candles: candlesStages,
                },
            },
            {
                $project: {
                    summery: {
                        $ifNull: [{ $arrayElemAt: ['$summary.summery', 0] }, emptySummery()],
                    },
                    candles: {
                        $ifNull: [{ $arrayElemAt: ['$candles.candles', 0] }, []],
                    },
                },
            },
        ];

        const docs = await this.orders
            .aggregate(pipeline, { allowDiskUse: true, maxTimeMS: 25_000 })
            .read('secondaryPreferred')
            .exec();

        const result = docs?.[0];
        return (result as SalesStatsCore) ?? { summery: emptySummery(), candles: [] };
    }
}

// Clean default for empty result sets
function emptySummery(): SalesSummery {
    return {
        TotalOrdersCount: 0,
        TotalItemsSold: 0,
        TotalUniqueProductsSold: 0,
        TotalUniqueCustomersCount: 0,
        TotalNewCustomersCount: 0,
        TotalGrossRevenue: 0,
    };
}
