import { Socket } from './Socket';

import { CHAT_EVENTS, CHAT_EMITS } from '@/constants/socketEvents';
import { MutationTypes } from '@/store/chat/mutations';
import { ChatMessage, ChatRoom, ChatUser } from '@/types/api/Chat';

export class ChatSocket extends Socket {
  protected events = {
    [CHAT_EVENTS.GET_CHAT]: this.getChat,
    [CHAT_EVENTS.GET_ROOMS_LIST]: this.getRoomsList,
    [CHAT_EVENTS.GET_ROOM]: this.getRoom,
    [CHAT_EVENTS.GET_USERS_ROOM_LIST]: this.getUsersRoomList,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getChat(data: Array<ChatMessage>) {
    this.store.commit(MutationTypes.SET_MESSAGES_LIST, data);
  }

  getRoomsList(data: Array<ChatRoom>) {
    this.store.commit(MutationTypes.SET_ROOMS_LIST, data);
  }

  getRoom(data: ChatRoom) {
    this.store.commit(MutationTypes.SET_ROOM, data);
  }

  getUsersRoomList(data: Array<ChatUser>) {
    this.store.commit(MutationTypes.SET_USERS_ROOM_LIST, data);
  }

  addMessage(message: ChatMessage) {
    this.socket.emit(CHAT_EMITS.ADD_MESSAGE, message);
  }
}
