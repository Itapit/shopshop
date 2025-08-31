import { CandleInterval } from '@common/Enums';
import { PipelineStage } from 'mongoose';
import { toDateTruncUnit, tzOrDefault } from '../utils/candle.util';

export const groupCandles: PipelineStage = {
    $group: {
        _id: '$bucketStart',

        ordersSet: { $addToSet: '$_id' },
        customersSet: { $addToSet: '$customer_id' },
        productsSet: { $addToSet: '$productID' },
        itemsSold: { $sum: '$quantity' },
        orderTotalsOnce: { $addToSet: { orderId: '$_id', total: '$orderTotal' } },

        newCustomersSet: {
            $addToSet: {
                $cond: ['$$ROOT.isNewCustomer', '$customer_id', '$$REMOVE'],
            },
        },
    },
};

export const projectCandleMetrics = (interval: CandleInterval, timezone?: string): PipelineStage => ({
    $project: {
        _id: 0,
        dateRange: {
            start: '$_id',
            end: {
                $dateAdd: {
                    startDate: '$_id',
                    unit: toDateTruncUnit(interval),
                    amount: 1,
                    timezone: tzOrDefault(timezone),
                },
            },
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
    },
});

export const sortByBucketAsc: PipelineStage = { $sort: { _id: 1 } };
