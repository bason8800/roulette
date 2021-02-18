export type ChatMessage = {
  message: string;
  userId: number;
};

export type ChatUser = {
  id: number;
  name: string;
  level: string;
  avatar: string;
};

export type ChatRoom = {
  id: number;
  name: string;
  icon: string;
  users: Array<ChatUser>;
  messagesList: Array<ChatMessage>;
};
