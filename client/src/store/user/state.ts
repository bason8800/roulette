import { User } from '@/types/api/User';

export type State = {
  [K in keyof User]: User[K];
};

export const state: State = {
  id: 0,
  name: '',
  level: 0,
  balance: 0,
  avatar: '',
};
