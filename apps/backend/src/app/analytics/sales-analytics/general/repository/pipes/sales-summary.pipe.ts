import { PipelineStage } from 'mongoose';
import {
    aggregateSummaryTotals,
    groupPerOrderMetrics,
    matchDateRange,
    projectOrderTotals,
    projectUniqueProductsCount,
    reshapeSummaryFields,
    setFirstOrderPerCustomer,
    unwindItems,
} from '../stages';

export const salesSummaryPipe = (start: Date, end: Date): PipelineStage[] => [
    matchDateRange(start, end),
    setFirstOrderPerCustomer,
    unwindItems,
    projectOrderTotals,
    groupPerOrderMetrics,
    aggregateSummaryTotals(start, end),
    reshapeSummaryFields,
    projectUniqueProductsCount,
    { $project: { summary: '$$ROOT' } },
];
