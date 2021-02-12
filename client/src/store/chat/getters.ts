import { GetterTree } from 'vuex';
import { State as RootState } from '@/store';
import { State } from '@/store/chat/state';

export type Getters = {};

export const getters: GetterTree<State, RootState> & Getters = {};
