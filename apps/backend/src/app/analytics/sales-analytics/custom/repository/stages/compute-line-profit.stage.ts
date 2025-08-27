import { Stage } from '../utils/types';
export const computeLineProfitStage = (): Stage => ({
  $addFields: { lineProfit: { $multiply: ['$quantity', '$unitPrice'] } },
});
