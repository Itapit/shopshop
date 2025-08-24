import { CandleInterval } from '@common/Enums';
import { PipelineStage } from 'mongoose';
import { toDateTruncUnit, tzOrDefault } from '../utils/candle.util';

export const groupCandles = (interval: CandleInterval, timezone?: string): PipelineStage => ({
    $group: {
        _id: {
            bucket: {
                $dateTrunc: {
                    date: '$createdAt',
                    unit: toDateTruncUnit(interval),
                    timezone: tzOrDefault(timezone),
                },
            },
        },

        ordersSet: { $addToSet: '$_id' },
        customersSet: { $addToSet: '$customer_id' },
        productsSet: { $addToSet: '$productID' },
        itemsSold: { $sum: '$quantity' },

        orderTotalsOnce: { $addToSet: { orderId: '$_id', total: '$orderTotal' } },

        newCustomersSet: {
            $addToSet: {
                $cond: [
                    {
                        $and: [
                            { $gte: ['$firstOrderAt', '$_id.bucket'] },
                            {
                                $lt: [
                                    '$firstOrderAt',
                                    {
                                        $dateAdd: {
                                            startDate: '$_id.bucket',
                                            unit: toDateTruncUnit(interval),
                                            amount: 1,
                                            timezone: tzOrDefault(timezone),
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    '$customer_id',
                    '$$REMOVE',
                ],
            },
        },

        bucketStart: { $first: '$_id.bucket' },
    },
});

export const projectCandleMetrics: PipelineStage = {
    $project: {
        _id: 0,
        dateRange: {
            start: { $toString: '$bucketStart' },
            end: { $toString: '$bucketStart' },
        },
        metrics: {
            ordersCount: { $size: '$ordersSet' },
            itemsSold: '$itemsSold',
            uniqueProductsSold: { $size: '$productsSet' },
            uniqueCustomersCount: { $size: '$customersSet' },
            newCustomersCount: { $size: '$newCustomersSet' },
            // sum values from the (orderId,total) pairs
            grossRevenue: {
                $sum: { $map: { input: '$orderTotalsOnce', as: 'o', in: '$$o.total' } },
            },
        },
        bucketStart: 1,
    },
};

export const sortByBucketAsc: PipelineStage = { $sort: { bucketStart: 1 } };
