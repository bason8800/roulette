import { ChatMessage, ChatRoom } from '@/types/api/Chat';

export interface State {
  messageList: Array<ChatMessage>;
  roomList: Array<ChatRoom>;
  room: ChatRoom | null;
}

export const state: State = {
  messageList: [],
  roomList: [],
  room: null,
};
