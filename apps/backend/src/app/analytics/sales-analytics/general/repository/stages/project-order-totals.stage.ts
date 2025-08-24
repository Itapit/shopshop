import { PipelineStage } from 'mongoose';

export const projectOrderTotals: PipelineStage = {
    $project: {
        createdAt: 1,
        customer_id: 1,
        productID: '$items.productID',
        quantity: {
            // check if the quantity is int , if not convert it
            $cond: [{ $isNumber: '$items.quantity' }, '$items.quantity', { $toInt: '$items.quantity' }],
        },
        orderTotal: {
            // check if the total_price is int , if not convert it
            $cond: [{ $isNumber: '$total_price' }, '$total_price', { $toDouble: '$total_price' }],
        },

        customer_oid: {
            // convert the customer_id string into a objectId
            $convert: { input: '$customer_id', to: 'objectId', onError: null, onNull: null },
        },
        product_oid: {
            // convert the product_id string into a objectId
            $convert: { input: '$items.productID', to: 'objectId', onError: null, onNull: null },
        },
    },
};
