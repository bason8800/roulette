import { MutationTree } from 'vuex';

import { State } from './state';

export enum MutationTypes {
  SET_TIME = 'SET_TIME',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TIME](state: S, time: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TIME](state, time) {
    state.time = time;
  },
};
