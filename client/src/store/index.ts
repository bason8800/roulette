import { createStore } from 'vuex';

import { State as AppState } from '@/store/app/state';
import { State as ChatState } from '@/store/chat/state';
import { State as UserState } from '@/store/user/state';
import { State as RouletteState } from '@/store/roulette/state';
import { State as BetState } from '@/store/bet/state';

import { AppModule, Store as AppStore } from '@/store/app';
import { ChatModule, Store as ChatStore } from '@/store/chat';
import { UserModule, Store as UserStore } from '@/store/user';
import { RouletteModule, Store as RouletteStore } from '@/store/roulette';
import { BetModule, Store as BetStore } from '@/store/bet';

export type State = {
  app: AppState;
  chat: ChatState;
  user: UserState;
  roulette: RouletteState;
  bet: BetState;
};

export type Store = ChatStore & AppStore & UserStore & RouletteStore & BetStore;

export const store = createStore({
  modules: {
    chat: ChatModule,
    app: AppModule,
    user: UserModule,
    roulette: RouletteModule,
    bet: BetModule,
  },
});

export function useStore(): Store {
  return store as Store;
}

export default store;
