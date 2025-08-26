import { Stage } from '../utils/types';
export const filterMonthsStage = (p: { months: string[] }): Stage => ({
  $match: { month: { $in: p.months } },
});