import { CandleInterval } from '@common/Enums';

export type TruncUnit = 'day' | 'week' | 'month' | 'quarter';

function assertNever(x: never): never {
    throw new Error(`Unsupported CandleInterval: ${x as any}`);
}
export function toDateTruncUnit(interval: CandleInterval): TruncUnit {
    switch (interval) {
        case CandleInterval.Day:
            return 'day';
        case CandleInterval.Week:
            return 'week';
        case CandleInterval.Month:
            return 'month';
        case CandleInterval.Quarter:
            return 'quarter';
        default:
            return assertNever(interval);
    }
}
export const tzOrDefault = (tz?: string) => (tz && tz.trim() ? tz : 'Asia/Jerusalem');
