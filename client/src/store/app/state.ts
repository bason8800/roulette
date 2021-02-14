import { MainData } from '@/types/api/App';

export interface State {
  mainData: MainData;
}

export const state: State = {
  mainData: {
    lang: 'en',
    usersOnline: 0,
  },
};
