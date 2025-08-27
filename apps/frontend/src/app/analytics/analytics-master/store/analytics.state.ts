import { CandleInterval } from '@common/Enums';
import { DateRangeObj } from '@common/Interfaces';
import { DatePresetKey } from '../../date-range-filter';

export const analyticsFeatureKey = 'analytics';

export interface AnalyticsState {
    globalDate: DateRangeObj | null;
    presetDate: DatePresetKey | null;
    candleInterval: CandleInterval | null;
    timezone: string | null;
}

export const initialAnalyticsState: AnalyticsState = {
    globalDate: null,
    presetDate: null,
    candleInterval: null,
    timezone: null,
};
