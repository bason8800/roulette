import { Module } from 'vuex';

import { CommonStore } from '@/store/common-types';

import { State, state } from './state';
import { Mutations, mutations } from './mutations';

import { State as RootState } from '@/store';

export type Store<S = State> = CommonStore<S, Mutations<S>>;

export const AppModule: Module<State, RootState> = {
  state,
  mutations,
};
