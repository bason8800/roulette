import { MainData } from '@/types/api/App';

export type State = {
  [K in keyof MainData]: MainData[K];
};

export const state: State = {
  lang: 'en',
  usersOnline: 0,
};
