import { Socket } from '@/classes/socket/Socket';
import { USER_EVENTS } from '@/constants/socketEvents';
import { MutationTypes } from '@/store/user/mutations';
import { User } from '@/types/api/User';

export class UserSocket extends Socket {
  protected events = {
    [USER_EVENTS.GET_USER]: this.getUser,
    [USER_EVENTS.UPDATE_USER_BALANCE]: this.updateUserBalance,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getUser(user: User) {
    this.store.commit(MutationTypes.SET_USER, user);
  }

  updateUserBalance(balance: number) {
    this.store.commit(MutationTypes.UPDATE_USER_BALANCE, balance);
  }
}
