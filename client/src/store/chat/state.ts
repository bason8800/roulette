import { ChatMessage } from '@/types/api/Chat';

export interface State {
  messageList: Array<ChatMessage>;
}

export const state: State = {
  messageList: [],
};
