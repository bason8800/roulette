import { ActionTree } from 'vuex';

import { State as RootState } from '@/store';
import { AugmentedActionContext } from '@/store/common-types';

import { State } from './state';
import { Mutations, MutationTypes } from './mutations';

type ActionParams = AugmentedActionContext<State, Mutations>;

export enum ActionTypes {
  GET_CHAT = 'GET_CHAT',
  TEST = 'TEST',
}

export type Actions = {
  [ActionTypes.GET_CHAT](params: ActionParams): void;
  [ActionTypes.TEST](params: ActionParams, payload: number): void;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.GET_CHAT]({ commit }) {
    await new Promise(resolve => {
      commit(MutationTypes.SET_MESSAGE_LIST, [
        { message: 'asdasd', userId: 1 },
      ]);
      resolve();
    });
  },

  [ActionTypes.TEST](store, payload) {
    console.log(payload);
  },
};
