import { Module } from 'vuex';

import { State as RootState } from '@/store';

import { CommonStore } from '@/store/common-types';

import { State, state } from './state';
import { Mutations, mutations } from './mutations';

export type Store<S = { roulette: State }> = CommonStore<S, Mutations<S>>;

export const RouletteModule: Module<State, RootState> = {
  state,
  mutations,
};
