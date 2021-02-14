export interface ChatMessage {
  message: string;
  userId: number;
}

export interface ChatRoom {
  id: number;
  name: string;
  icon: string;
  usersCount: number;
}
