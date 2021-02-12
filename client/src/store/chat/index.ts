import { Module } from 'vuex';

import { State as RootState } from '@/store';

import {
  CommonVuexStore,
  CommonCommit,
  CommonGetters,
  CommonDispatch,
} from '@/store/common-types';

import { State, state } from '@/store/chat/state';
import { Mutations, mutations } from '@/store/chat/mutations';
import { Actions, actions } from '@/store/chat/actions';
import { Getters, getters } from '@/store/chat/getters';

export type Store<S = State> = CommonVuexStore<S> &
  CommonCommit<S, Mutations<S>> &
  CommonDispatch<Actions> &
  CommonGetters<State, Getters>;

export const ChatModule: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
