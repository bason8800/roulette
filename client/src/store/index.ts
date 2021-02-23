import { createStore } from 'vuex';

import { State as AppState } from '@/store/app/state';
import { State as ChatState } from '@/store/chat/state';
import { State as UserState } from '@/store/user/state';
import { State as RouletteState } from '@/store/roulette/state';

import { AppModule, Store as AppStore } from '@/store/app';
import { ChatModule, Store as ChatStore } from '@/store/chat';
import { UserModule, Store as UserStore } from '@/store/user';
import { RouletteModule, Store as RouletteStore } from '@/store/roulette';

export type State = {
  app: AppState;
  chat: ChatState;
  user: UserState;
  roulette: RouletteState;
};

export type Store = ChatStore & AppStore & UserStore & RouletteStore;

export const store = createStore({
  modules: {
    chat: ChatModule,
    app: AppModule,
    user: UserModule,
    roulette: RouletteModule,
  },
});

export function useStore(): Store {
  return store as Store;
}

export default store;
