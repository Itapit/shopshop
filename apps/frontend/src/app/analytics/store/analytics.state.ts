import { DateRangeObj } from '@common/Interfaces';
import { DatePresetKey } from '../date-range-filter/enums';

export const analyticsFeatureKey = 'analytics';

export interface AnalyticsState {
    globalDate: DateRangeObj | null;
    presetDate: DatePresetKey | null;
}

export const initialAnalyticsState: AnalyticsState = {
    globalDate: null,
    presetDate: null,
};
