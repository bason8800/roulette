import { MutationTree } from 'vuex';
import { State } from './state';
import { ChatMessage } from '@/types/api/Chat';

export enum MutationTypes {
  SET_MESSAGE_LIST = 'SET_MESSAGE_LIST',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_MESSAGE_LIST](state: S, payload: Array<ChatMessage>): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_MESSAGE_LIST](state, payload) {
    state.messageList = payload;
  },
};
