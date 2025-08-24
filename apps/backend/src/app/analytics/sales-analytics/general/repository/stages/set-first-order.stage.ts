import { PipelineStage } from 'mongoose';

export const setFirstOrderPerCustomer: PipelineStage = {
    $setWindowFields: {
        partitionBy: '$customer_id',
        sortBy: { createdAt: 1 },
        output: {
            firstOrderAt: { $first: '$createdAt' },
        },
    },
};
