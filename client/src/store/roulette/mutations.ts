import { MutationTree } from 'vuex';
import { Roulette } from '@/types/api/Roulette';

import { State } from './state';

export enum MutationTypes {
  SET_TIME = 'SET_TIME',
  SET_OPTIONS = 'SET_OPTIONS',
  SET_WHEEL_DATA = 'SET_WHEEL_DATA',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TIME](state: S, payload: number): void;

  [MutationTypes.SET_OPTIONS](state: S, payload: Roulette['options']): void;

  [MutationTypes.SET_WHEEL_DATA](
    state: S,
    payload: {
      previousRolls: Roulette['previousRolls'];
      startAngle: Roulette['startAngle'];
    },
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TIME](state, payload) {
    state.time = payload;
  },

  [MutationTypes.SET_OPTIONS](state, payload) {
    state.options = payload;
  },

  [MutationTypes.SET_WHEEL_DATA](state, payload) {
    Object.assign(state, payload);
  },
};
