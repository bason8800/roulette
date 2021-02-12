import {
  ActionContext,
  CommitOptions,
  MutationTree,
  GetterTree,
  Store as VuexStore,
  DispatchOptions,
} from 'vuex';

import { State as RootState } from '@/store/index';

export type CommonVuexStore<S> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
>;

export type CommonCommit<State, Mutations extends MutationTree<State>> = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
};

type CommonActionsType = {
  [key: string]: (store: any, payload?: any) => any;
};

export type CommonDispatch<Actions extends CommonActionsType> = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>;
};

export type AugmentedActionContext<
  State,
  Mutations extends MutationTree<State>
> = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export type CommonGetters<
  State,
  Getters extends GetterTree<State, RootState>
> = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
