import { Socket } from './Socket';
import { useStore } from '@/store';

import { CHAT_EVENTS, CHAT_EMITS } from '@/constants/socketEvents';
import { MutationTypes } from '@/store/chat/mutations';
import { ChatMessage, ChatRoom } from '@/types/api/Chat';

const { commit } = useStore();

export class ChatSocket extends Socket {
  protected events = {
    [CHAT_EVENTS.GET_CHAT]: this.getChatHandler,
    [CHAT_EVENTS.GET_ROOMS_LIST]: this.getRoomsListHandler,
    [CHAT_EVENTS.GET_ROOM]: this.getRoomHandler,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getChatHandler(data: Array<ChatMessage>) {
    commit(MutationTypes.SET_MESSAGES_LIST, data);
  }

  getRoomsListHandler(data: Array<ChatRoom>) {
    commit(MutationTypes.SET_ROOMS_LIST, data);
  }

  getRoomHandler(data: ChatRoom) {
    commit(MutationTypes.SET_ROOM, data);
  }

  addMessage(message: ChatMessage) {
    this.socket.emit(CHAT_EMITS.ADD_MESSAGE, message);
  }
}
