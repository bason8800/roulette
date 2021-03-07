import { MutationTree } from 'vuex';
import { State } from './state';
import { BetsList } from '@/types/api/Bet';

export enum MutationsTypes {
  SET_BETS_LIST = 'SET_BETS_LIST',
  SET_WIN_BET = 'SET_WIN_BET',
}

export type Mutations<S = State> = {
  [MutationsTypes.SET_BETS_LIST](state: S, payload: BetsList): void;
  [MutationsTypes.SET_WIN_BET](state: S, payload: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationsTypes.SET_BETS_LIST](state, payload) {
    state.list = payload;
  },

  [MutationsTypes.SET_WIN_BET](state, payload) {
    state.winId = payload;
  },
};
