import { Socket } from './Socket';

import { CHAT_EVENTS, CHAT_EMITS } from '@/constants/socketEvents';
import { MutationTypes } from '@/store/chat/mutations';
import { ChatMessage, ChatRoom } from '@/types/api/Chat';

export class ChatSocket extends Socket {
  protected events = {
    [CHAT_EVENTS.GET_ROOMS_LIST]: this.getRoomsList,
    [CHAT_EVENTS.GET_ROOM]: this.getRoom,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getRoomsList(data: Array<ChatRoom>) {
    this.store.commit(MutationTypes.SET_ROOMS_LIST, data);
  }

  getRoom(data: ChatRoom) {
    this.store.commit(MutationTypes.SET_ROOM, data);
  }

  addMessage(roomId: number, data: ChatMessage) {
    this.socket.emit(CHAT_EMITS.ADD_MESSAGE, { roomId, data });
  }

  changeRoom(id: number) {
    this.socket.emit(CHAT_EMITS.CHANGE_ROOM, id);
  }
}
