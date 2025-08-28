import { CandleInterval } from '@common/Enums';
import { PipelineStage } from 'mongoose';
import { toDateTruncUnit, tzOrDefault } from '../utils/candle.util';

export const computeIsNewCustomer = (interval: CandleInterval, timezone?: string): PipelineStage => ({
    $set: {
        isNewCustomer: {
            $and: [
                { $gte: ['$firstOrderAt', '$bucketStart'] },
                {
                    $lt: [
                        '$firstOrderAt',
                        {
                            $dateAdd: {
                                startDate: '$bucketStart',
                                unit: toDateTruncUnit(interval),
                                amount: 1,
                                timezone: tzOrDefault(timezone),
                            },
                        },
                    ],
                },
            ],
        },
    },
});
