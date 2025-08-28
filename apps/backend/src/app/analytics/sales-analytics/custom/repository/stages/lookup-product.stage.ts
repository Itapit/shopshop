import { Stage } from '../utils/types';

export const lookupProductStage = (p: { productsColl: string }): Stage => ({
    $lookup: {
        from: p.productsColl,
        let: { pid: '$productIdObj' },
        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$pid'] } } }, { $project: { price: 1, name: 1 } }],
        as: 'prod',
    },
});
