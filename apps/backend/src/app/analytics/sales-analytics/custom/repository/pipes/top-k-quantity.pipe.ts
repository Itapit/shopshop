import {
    filterMonthsStage,
    finalSortStage,
    groupMonthProductStage,
    matchDateRangeStage,
    packTopKPerMonthStage,
    projectRawIdAndMonthStage,
    sortWithinMonthStage,
    toProductKeyStage,
    unwindItemsStage,
} from '../stages';
import { pipe } from '../utils/pipe';
import { TopKParams } from '../utils/types';

export const buildTopKQuantityPipeline = pipe<TopKParams>(
    (p) => matchDateRangeStage({ startUtc: p.startUtc, endUtc: p.endUtc }),
    (_) => unwindItemsStage(),
    (p) => projectRawIdAndMonthStage({ timezone: p.timezone }),
    (p) => filterMonthsStage({ months: p.months }),
    (_) => toProductKeyStage(), // <-- keep productKey alive until after grouping

    // group by month + productKey
    (_) => groupMonthProductStage({ metric: 'quantity' }),

    // now it’s safe to rename productKey → productId
    (_) => ({ $project: { _id: 0, month: '$_id.month', productId: '$_id.productId', quantity: 1 } }),

    (_) => sortWithinMonthStage({ metric: 'quantity' }),
    (p) => packTopKPerMonthStage({ metric: 'quantity', k: p.k }),
    (_) => finalSortStage({ metric: 'quantity' })
);
