import { Socket } from './Socket';
import { useStore } from '@/store';

import { CHAT_EVENTS, CHAT_EMITS } from '@/constants/socketEvents';
import { MutationTypes } from '@/store/chat/mutations';
import { ChatMessage } from '@/types/api/Chat';

const { commit } = useStore();

export class ChatSocket extends Socket {
  protected events = {
    [CHAT_EVENTS.GET_CHAT]: this.getChatHandler,
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  getChatHandler(data: Array<ChatMessage>) {
    commit(MutationTypes.SET_MESSAGE_LIST, data);
  }

  addMessage(message: ChatMessage) {
    this.socket.emit(CHAT_EMITS.ADD_MESSAGE, message);
  }
}
