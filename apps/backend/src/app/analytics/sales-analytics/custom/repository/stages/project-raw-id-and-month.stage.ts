import { Stage } from '../utils/types';

export const projectRawIdAndMonthStage = (p: { timezone: string }): Stage => ({
    $project: {
        productIdRaw: {
            $ifNull: [
                '$items.productID',
                { $ifNull: ['$items.productId', { $ifNull: ['$items.product_id', '$items._id'] }] },
            ],
        },
        quantity: {
            $cond: [
                { $in: [{ $type: '$items.quantity' }, ['double', 'int', 'long', 'decimal']] },
                '$items.quantity',
                { $toDouble: '$items.quantity' },
            ],
        },
        month: { $dateToString: { format: '%Y-%m', date: '$createdAt', timezone: p.timezone } },
    },
});
