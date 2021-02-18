import { Socket } from './Socket';

import { APP_EVENTS } from '@/constants/socketEvents';
import { MutationTypes } from '@/store/app/mutations';
import { MainData } from '@/types/api/App';

export class AppSocket extends Socket {
  protected events = {
    [APP_EVENTS.GET_MAIN_DATA]: this.getMainData,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getMainData(data: MainData) {
    this.store.commit(MutationTypes.GET_MAIN_DATA, data);
  }
}
