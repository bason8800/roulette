import { MutationTree } from 'vuex';

import { State } from '@/store/user/state';
import { User } from '@/types/api/User';

export enum MutationTypes {
  SET_USER = 'SET_USER',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_USER](state: S, payload: User): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER](state, payload) {
    Object.assign(state, payload);
  },
};
