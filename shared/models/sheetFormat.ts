import { Ranks } from './candidate.js';

export interface AgreedSheet {
  A1: {
    v: Ranks;
  };
  B1: {
    v: number;
  };
  C1: {
    v: boolean;
  };
}