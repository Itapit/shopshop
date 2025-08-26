import { PipelineStage } from 'mongoose';

export type Stage = PipelineStage | PipelineStage[];

/** The params we pass to the pipeline builders */
export interface TopKParams {
  startUtc: Date;
  endUtc: Date;
  months: string[];
  timezone: string;
  k: number;
}