export type ChatMessage = {
  message: string;
  userId: number;
};

export type ChatRoom = {
  id: number;
  name: string;
  icon: string;
  usersCount: number;
};

export type ChatUser = {
  id: number;
  name: string;
  level: string;
  avatar: string;
};
