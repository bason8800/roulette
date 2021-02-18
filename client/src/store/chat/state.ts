import { ChatMessage, ChatRoom, ChatUser } from '@/types/api/Chat';

export interface State {
  room: ChatRoom;
  roomList: Array<ChatRoom>;
  messageList: Array<ChatMessage>;
  usersRoomList: Array<ChatUser>;
}

export const state: State = {
  room: {} as ChatRoom,
  roomList: [],
  messageList: [],
  usersRoomList: [],
};
