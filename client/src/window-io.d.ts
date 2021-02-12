import { SocketIO } from '@types/socket.io';

export declare global {
  interface Window {
    io: SocketIO;
  }
}
