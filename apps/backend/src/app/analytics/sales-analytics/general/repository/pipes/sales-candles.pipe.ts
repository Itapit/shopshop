import { CandleInterval } from '@common/Enums';
import { PipelineStage } from 'mongoose';
import {
    groupCandles,
    matchDateRange,
    projectCandleMetrics,
    projectOrderTotals,
    setFirstOrderPerCustomer,
    sortByBucketAsc,
    unwindItems,
} from '../stages';

export const salesCandlesPipe = (
    start: Date,
    end: Date,
    interval: CandleInterval,
    timezone?: string
): PipelineStage[] => [
    matchDateRange(start, end),
    setFirstOrderPerCustomer,
    unwindItems,
    projectOrderTotals,

    groupCandles(interval, timezone),
    projectCandleMetrics,
    sortByBucketAsc,
    { $group: { _id: null, candles: { $push: '$$ROOT' } } },
    { $project: { _id: 0, candles: 1 } },
];
