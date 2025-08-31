import { Stage } from '../utils/types';

export const computeUnitPriceStage = (): Stage => [
    { $unwind: { path: '$prod', preserveNullAndEmptyArrays: true } },
    {
        $addFields: {
            unitPrice: {
                $cond: [
                    { $in: [{ $type: '$prod.price' }, ['double', 'int', 'long', 'decimal']] },
                    '$prod.price',
                    { $toDouble: { $ifNull: ['$prod.price', 0] } },
                ],
            },
        },
    },
];
