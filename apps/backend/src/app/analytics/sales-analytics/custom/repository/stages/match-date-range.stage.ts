import { Stage } from '../utils/types';

export const matchDateRangeStage = (p: { startUtc: Date; endUtc: Date }): Stage => ({
  $match: { createdAt: { $gte: p.startUtc, $lt: p.endUtc } },
});