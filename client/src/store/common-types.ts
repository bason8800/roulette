import {
  ActionContext,
  CommitOptions,
  MutationTree,
  GetterTree,
  Store as VuexStore,
  DispatchOptions,
} from 'vuex';

import { State as RootState } from '@/store/index';

export type AugmentedActionContext<
  State,
  Mutations extends MutationTree<State>
> = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

type CommonActions = {
  [key: string]: (store: any, payload?: any) => any;
};

export type CommonStore<
  State,
  Mutations extends MutationTree<State> = {},
  Actions extends CommonActions = {},
  Getters extends GetterTree<State, RootState> = {}
> = Omit<VuexStore<State>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
