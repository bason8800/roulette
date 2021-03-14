import { MutationTree } from 'vuex';

import { State } from '@/store/user/state';
import { User } from '@/types/api/User';

export enum MutationTypes {
  SET_USER = 'SET_USER',
  UPDATE_USER_BALANCE = 'UPDATE_USER_BALANCE',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_USER](state: S, payload: User): void;
  [MutationTypes.UPDATE_USER_BALANCE](state: S, payload: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER](state, payload) {
    Object.assign(state, payload);
  },

  [MutationTypes.UPDATE_USER_BALANCE](state, payload) {
    state.balance = payload;
  },
};
