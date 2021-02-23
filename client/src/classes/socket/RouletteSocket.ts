import { Socket } from '@/classes/socket/Socket';

import { RouletteWheelData } from '@/types/api/Roulette';
import { ROULETTE_EVENTS } from '@/constants/socketEvents';
import { MutationTypes } from '@/store/roulette/mutations';

export class RouletteSocket extends Socket {
  protected events = {
    [ROULETTE_EVENTS.GET_ROULETTE_TIME]: this.getTime,
    [ROULETTE_EVENTS.GET_ROULETTE_OPTIONS]: this.getOptions,
    [ROULETTE_EVENTS.GET_WHEEL_DATA]: this.getWheelData,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getTime(time: number) {
    this.store.commit(MutationTypes.SET_TIME, time);
  }

  getOptions(options: Array<number>) {
    this.store.commit(MutationTypes.SET_OPTIONS, options);
  }

  getWheelData(data: RouletteWheelData) {
    this.store.commit(MutationTypes.SET_WHEEL_DATA, data);
  }
}
