import { PipelineStage } from 'mongoose';

export const matchDateRange = (start: Date, end: Date): PipelineStage => ({
    $match: { createdAt: { $gte: start, $lt: end } },
});
