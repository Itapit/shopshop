import { CandleInterval } from '@common/Enums';
import { PipelineStage } from 'mongoose';
import {
    computeBucketStart,
    groupCandles,
    matchDateRange,
    projectCandleMetrics,
    projectOrderTotals,
    setFirstOrderPerCustomer,
    sortByBucketAsc,
    unwindItems,
} from '../stages';
import { computeIsNewCustomer } from '../stages/compute-is-new-customer.stage';

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
    computeBucketStart(interval, timezone),
    computeIsNewCustomer(interval, timezone),

    groupCandles,
    projectCandleMetrics(interval, timezone),
    sortByBucketAsc,
    { $group: { _id: null, candles: { $push: '$$ROOT' } } },
    { $project: { _id: 0, candles: 1 } },
];
