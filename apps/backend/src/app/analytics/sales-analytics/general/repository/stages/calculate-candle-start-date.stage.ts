import { CandleInterval } from '@common/Enums';
import { PipelineStage } from 'mongoose';
import { toDateTruncUnit, tzOrDefault } from '../utils/candle.util';

export const calculateCandleStartDate = (interval: CandleInterval, timezone?: string): PipelineStage => ({
    $set: {
        bucketStart: {
            $dateTrunc: {
                date: '$createdAt',
                unit: toDateTruncUnit(interval),
                timezone: tzOrDefault(timezone),
            },
        },
    },
});
