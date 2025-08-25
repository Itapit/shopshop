import { CandleInterval } from '@common/Enums';
import { SalesSummary } from '@common/Interfaces';
import { PipelineStage } from 'mongoose';
import { salesCandlesPipe } from './sales-candles.pipe';
import { salesSummaryPipe } from './sales-summary.pipe';

export function emptySummary(): SalesSummary {
    return {
        TotalOrdersCount: 0,
        TotalItemsSold: 0,
        TotalUniqueProductsSold: 0,
        TotalUniqueCustomersCount: 0,
        TotalNewCustomersCount: 0,
        TotalGrossRevenue: 0,
    };
}

//Builds the full  pipeline for general metrics: using the summary and candles pipes
export function salesGeneralPipe(start: Date, end: Date, interval: CandleInterval, timezone?: string): PipelineStage[] {
    const summaryStages = salesSummaryPipe(start, end) as PipelineStage.FacetPipelineStage[];
    const candlesStages = salesCandlesPipe(
        start,
        end,
        interval as CandleInterval,
        timezone
    ) as PipelineStage.FacetPipelineStage[];

    return [
        {
            $facet: {
                summary: summaryStages,
                candles: candlesStages,
            },
        },
        {
            $project: {
                summary: {
                    $ifNull: [
                        { $arrayElemAt: ['$summary.summary', 0] },
                        { $literal: emptySummary() }, // inject a constant object
                    ],
                },
                candles: {
                    $ifNull: [{ $arrayElemAt: ['$candles.candles', 0] }, []],
                },
            },
        },
    ];
}
