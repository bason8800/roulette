import { BetsList } from '@/types/api/Bet';

export type State = {
  list: BetsList;
  winId: number;
};

export const state: State = {
  list: [] as BetsList,
  winId: 0,
};
