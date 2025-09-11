import { Stage } from '../utils/types';
export const unwindItemsStage = (): Stage => ({ $unwind: '$items' });
