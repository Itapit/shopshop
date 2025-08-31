import { CandleInterval } from '@common/Enums';

export type LocalCandleIntervalState = {
    // global candleInterval
    globalSnapshot: CandleInterval | null;

    // local range
    enabled: boolean;
    localInterval: CandleInterval | null;
    seededFromGlobal: boolean;
};

export const initialLocalCandleIntervalState: LocalCandleIntervalState = {
    globalSnapshot: null,

    enabled: false,
    localInterval: null,
    seededFromGlobal: false,
};
