import { DatePresetKey } from '../date-range-filter/enums';
import { DateRange } from '../date-range-filter/interfaces';

export const analyticsFeatureKey = 'analytics';

export interface AnalyticsState {
    globalDate: DateRange | null;
    presetDate: DatePresetKey | null;
}

export const initialAnalyticsState: AnalyticsState = {
    globalDate: null,
    presetDate: null,
};
