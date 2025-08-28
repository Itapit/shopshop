import { Stage } from '../utils/types';

export const toProductKeyStage = (): Stage => [
    {
        $addFields: {
            productKey: {
                $cond: [
                    { $eq: [{ $type: '$productIdRaw' }, 'objectId'] },
                    { $toString: '$productIdRaw' },
                    '$productIdRaw',
                ],
            },
        },
    },
    { $match: { productKey: { $ne: null } } },
];
