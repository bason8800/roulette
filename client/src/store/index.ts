import { createStore, createLogger } from 'vuex';

import { State as ChatState } from '@/store/chat/state';
import { ChatModule, Store as ChatStore } from '@/store/chat';

export type State = {
  chat: ChatState;
};

export type Store = ChatStore<Pick<State, 'chat'>>;

export const store = createStore({
  plugins: process.env.NODE_ENV === 'production' ? [] : [createLogger()],
  modules: { chat: ChatModule },
});

export function useStore(): Store {
  return store as Store;
}

export default store;
