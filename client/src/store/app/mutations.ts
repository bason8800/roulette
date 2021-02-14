import { MutationTree } from 'vuex';
import { State } from './state';
import { MainData } from '@/types/api/App';

export enum MutationTypes {
  GET_MAIN_DATA = 'GET_MAIN_DATA',
}

export type Mutations<S = State> = {
  [MutationTypes.GET_MAIN_DATA](state: S, payload: MainData): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.GET_MAIN_DATA](state, payload) {
    Object.assign(state, payload);
  },
};
