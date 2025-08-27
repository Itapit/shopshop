import { Stage } from '../utils/types';
export const finalSortStage = (p: { metric: 'quantity' | 'profit' }): Stage => ({
  $sort: { month: 1, [p.metric]: -1, productId: 1 },
});
