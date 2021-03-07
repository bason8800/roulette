import { Roulette } from '@/types/api/Roulette';

export type State = {
  [K in keyof Roulette]: Roulette[K];
};

export const state: State = {
  time: 0,
  previousRolls: [],
  startAngle: 0,
  options: [],
};
