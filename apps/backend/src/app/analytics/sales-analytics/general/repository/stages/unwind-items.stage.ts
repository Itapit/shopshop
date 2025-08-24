import { PipelineStage } from 'mongoose';

export const unwindItems: PipelineStage = { $unwind: { path: '$items', preserveNullAndEmptyArrays: false } };
