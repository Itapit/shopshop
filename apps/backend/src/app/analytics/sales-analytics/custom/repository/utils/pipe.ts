import { PipelineStage } from 'mongoose';
import { Stage } from './types';

export function pipe<P>(...builders: Array<(p: P) => Stage>) {
  return (p: P): PipelineStage[] => {
    const out: PipelineStage[] = [];
    for (const b of builders) {
      const s = b(p);
      if (Array.isArray(s)) out.push(...s);
      else out.push(s);
    }
    return out;
  };
}