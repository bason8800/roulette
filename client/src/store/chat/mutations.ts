import { MutationTree } from 'vuex';
import { State } from './state';
import { ChatMessage, ChatRoom } from '@/types/api/Chat';

export enum MutationTypes {
  SET_MESSAGES_LIST = 'SET_MESSAGES_LIST',
  SET_ROOMS_LIST = 'SET_ROOMS_LIST',
  SET_ROOM = 'SET_ROOM',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_MESSAGES_LIST](
    state: S,
    payload: Array<ChatMessage>,
  ): void;

  [MutationTypes.SET_ROOMS_LIST](state: S, payload: Array<ChatRoom>): void;

  [MutationTypes.SET_ROOM](state: S, payload: ChatRoom): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_MESSAGES_LIST](state, payload) {
    state.messageList = payload;
  },

  [MutationTypes.SET_ROOMS_LIST](state, payload) {
    state.roomList = payload;
  },

  [MutationTypes.SET_ROOM](state, payload) {
    state.room = payload;
  },
};
