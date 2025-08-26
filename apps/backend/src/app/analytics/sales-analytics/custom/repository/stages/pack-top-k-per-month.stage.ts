import { Stage } from '../utils/types';

export const packTopKPerMonthStage = (p: { metric: 'quantity' | 'profit'; k: number }): Stage => ([
  { $group: { _id: '$month', items: { $push: { productId: '$productId', [p.metric]: `$${p.metric}` } } } },
  { $project: { month: '$_id', items: { $slice: ['$items', Math.max(1, Math.floor(p.k))] } } },
  { $unwind: '$items' },
  { $project: { _id: 0, month: 1, productId: '$items.productId', [p.metric]: `$items.${p.metric}` } },
]);
