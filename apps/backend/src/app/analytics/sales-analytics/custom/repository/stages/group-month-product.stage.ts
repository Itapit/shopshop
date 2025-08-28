import { Stage } from '../utils/types';

export const groupMonthProductStage = (p: { metric: 'quantity' | 'profit' }): Stage => ({
    $group: {
        _id: {
            month: '$month',
            productId: p.metric === 'profit' ? '$productIdObj' : '$productKey',
        },
        [p.metric]: { $sum: p.metric === 'profit' ? '$lineProfit' : '$quantity' },
    },
});
