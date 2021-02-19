import { Module } from 'vuex';

import { State as RootState } from '@/store';

import { CommonStore } from '@/store/common-types';

import { State, state } from './state';
import { Mutations, mutations } from './mutations';

export type Store<S = { chat: State }> = CommonStore<S, Mutations<S>>;

export const ChatModule: Module<State, RootState> = {
  state,
  mutations,
};
