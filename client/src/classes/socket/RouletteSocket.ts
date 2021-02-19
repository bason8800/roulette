import { Socket } from '@/classes/socket/Socket';

import { ROULETTE_EVENTS } from '@/constants/socketEvents';

export class RouletteSocket extends Socket {
  protected events = {
    [ROULETTE_EVENTS.GET_TIME]: this.getTime,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getTime() {}
}
