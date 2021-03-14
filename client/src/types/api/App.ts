import { User } from '@/types/api/User';

export type MainData = {
  lang: string;
  usersOnline: number;
  users: Array<User>;
};
