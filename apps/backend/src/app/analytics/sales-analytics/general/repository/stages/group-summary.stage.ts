import { PipelineStage } from 'mongoose';

export const groupPerOrderMetrics: PipelineStage = {
    // turn each order into a single row with: customer id , order revenue , products id , item sold count
    $group: {
        _id: '$_id',
        customer_id: { $first: '$customer_id' },
        firstOrderAt: { $first: '$firstOrderAt' },
        orderTotalOnce: { $first: '$orderTotal' },
        products: { $addToSet: '$productID' },
        itemsSold: { $sum: '$quantity' },
    },
};

export const aggregateSummaryTotals = (start: Date, end: Date): PipelineStage => ({
    // group all documents into one for the whole time period
    $group: {
        _id: null,
        TotalOrdersCount: { $sum: 1 },
        TotalItemsSold: { $sum: '$itemsSold' },
        TotalUniqueCustomersSet: { $addToSet: '$customer_id' },
        TotalGrossRevenue: { $sum: '$orderTotalOnce' },
        ProductsSets: { $push: '$products' },

        // distinct customers whose first order is in this time period
        NewCustomersSet: {
            $addToSet: {
                $cond: [
                    { $and: [{ $gte: ['$firstOrderAt', start] }, { $lt: ['$firstOrderAt', end] }] },
                    '$customer_id',
                    '$$REMOVE',
                ],
            },
        },
    },
});

export const reshapeSummaryFields: PipelineStage = {
    /*
    remove the id
    keep TotalOrdersCount, TotalItemsSold, TotalGrossRevenue
    count TotalUniqueCustomersCount, TotalGrossRevenue
    merge all per order products into one set of product ids 
    */
    $project: {
        _id: 0,
        TotalOrdersCount: 1,
        TotalItemsSold: 1,
        TotalUniqueCustomersCount: { $size: '$TotalUniqueCustomersSet' },
        TotalNewCustomersCount: { $size: '$NewCustomersSet' },
        TotalGrossRevenue: 1,
        AllProducts: {
            $reduce: {
                input: '$ProductsSets',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] },
            },
        },
    },
};

export const projectUniqueProductsCount: PipelineStage = {
    // keep all values and calc unique products sold
    $project: {
        _id: 0,
        TotalOrdersCount: 1,
        TotalItemsSold: 1,
        TotalUniqueCustomersCount: 1,
        TotalNewCustomersCount: 1,
        TotalGrossRevenue: 1,
        TotalUniqueProductsSold: { $size: '$AllProducts' },
    },
};
