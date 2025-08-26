import { pipe } from '../utils/pipe';
import { TopKParams } from '../utils/types';
import {
  matchDateRangeStage,
  unwindItemsStage,
  projectRawIdAndMonthStage,
  filterMonthsStage,
  toProductObjectIdStage,
  lookupProductStage,
  computeUnitPriceStage,
  computeLineProfitStage,
  groupMonthProductStage,
  sortWithinMonthStage,
  packTopKPerMonthStage,
  finalSortStage,
} from '../stages';

/**
 * Curried builder:
 *   buildTopKProfitPipeline(productsColl)(params)
 */
export const buildTopKProfitPipeline = (productsColl: string) =>
  pipe<TopKParams>(
    p => matchDateRangeStage({ startUtc: p.startUtc, endUtc: p.endUtc }),
    _ => unwindItemsStage(),
    p => projectRawIdAndMonthStage({ timezone: p.timezone }),
    p => filterMonthsStage({ months: p.months }),
    _ => toProductObjectIdStage(),                 // creates productIdObj
    _ => lookupProductStage({ productsColl }),     // adds prod
    _ => computeUnitPriceStage(),                  // adds unitPrice
    _ => computeLineProfitStage(),                 // adds lineProfit
    _ => groupMonthProductStage({ metric: 'profit' }),
    _ => ({ $project: {
      _id: 0,
      month: '$_id.month',
      productId: { $toString: '$_id.productId' },
      profit: 1
    }}),
    _ => sortWithinMonthStage({ metric: 'profit' }),
    p => packTopKPerMonthStage({ metric: 'profit', k: p.k }),
    _ => finalSortStage({ metric: 'profit' }),
  );