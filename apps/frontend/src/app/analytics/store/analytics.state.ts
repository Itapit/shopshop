import { computeRangeForPreset } from '../analytics.helpers';
import { DatePresetKey, DateRange } from '../date-range-filter/date-range.model';

export const analyticsFeatureKey = 'analytics';

const DEFAULT_PRESET = DatePresetKey.LAST_30;
const DEFAULT_RANGE = computeRangeForPreset(DEFAULT_PRESET);

export interface AnalyticsState {
    globalDate: DateRange;
    presetDate: DatePresetKey;
}

export const initialanalyticsState: AnalyticsState = {
    globalDate: DEFAULT_RANGE,
    presetDate: DEFAULT_PRESET,
};
