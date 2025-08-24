import { PipelineStage } from 'mongoose';
import {
    groupSummaryFinal,
    groupSummaryPrepareOrderTotals,
    matchDateRange,
    projectOrderTotals,
    projectUniqueProductsCount,
    reshapeSummary,
    setFirstOrderPerCustomer,
    unwindItems,
} from '../stages';

export const salesSummaryPipe = (start: Date, end: Date): PipelineStage[] => [
    matchDateRange(start, end),
    setFirstOrderPerCustomer,
    unwindItems,
    projectOrderTotals,
    groupSummaryPrepareOrderTotals,
    groupSummaryFinal(start, end),
    reshapeSummary,
    projectUniqueProductsCount,
    { $project: { summery: '$$ROOT' } },
];
