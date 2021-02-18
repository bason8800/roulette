import { createStore, createLogger } from 'vuex';

// Main
import { State as AppState } from '@/store/app/state';
import { AppModule, Store as AppStore } from '@/store/app';

// ChatModule
import { State as ChatState } from '@/store/chat/state';
import { ChatModule, Store as ChatStore } from '@/store/chat';

// UserModule
import { State as UserState } from '@/store/user/state';
import { UserModule, Store as UserStore } from '@/store/user';

export type State = {
  app: AppState;
  chat: ChatState;
  user: UserState;
};

export type Store = ChatStore<Pick<State, 'chat'>> &
  AppStore<Pick<State, 'app'>> &
  UserStore<Pick<State, 'user'>>;

export const store = createStore({
  plugins: process.env.NODE_ENV === 'production' ? [] : [createLogger()],
  modules: {
    chat: ChatModule,
    app: AppModule,
    user: UserModule,
  },
});

export function useStore(): Store {
  return store as Store;
}

export default store;
