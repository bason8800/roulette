import { createStore, createLogger } from 'vuex';

// Main
import { State as AppState } from '@/store/app/state';
import { AppModule, Store as AppStore } from '@/store/app';

// ChatModule
import { State as ChatState } from '@/store/chat/state';
import { ChatModule, Store as ChatStore } from '@/store/chat';

export type State = {
  app: AppState;
  chat: ChatState;
};

export type Store = ChatStore<Pick<State, 'chat'>> &
  AppStore<Pick<State, 'app'>>;

export const store = createStore({
  plugins: process.env.NODE_ENV === 'production' ? [] : [createLogger()],
  modules: { chat: ChatModule, app: AppModule },
});

export function useStore(): Store {
  return store as Store;
}

export default store;
