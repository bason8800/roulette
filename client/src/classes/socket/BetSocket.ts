import { Socket } from '@/classes/socket/Socket';
import { BET_EVENTS } from '@/constants/socketEvents';
import { MutationsTypes } from '@/store/bet/mutations';
import { BetsList } from '@/types/api/Bet';

export class BetSocket extends Socket {
  protected events = {
    [BET_EVENTS.GET_BETS_LIST]: this.getBetsList,
    [BET_EVENTS.GET_WIN_BET]: this.getBetWin,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getBetsList(data: BetsList) {
    this.store.commit(MutationsTypes.SET_BETS_LIST, data);
  }

  getBetWin(data: number) {
    this.store.commit(MutationsTypes.SET_WIN_BET, data);
  }
}
