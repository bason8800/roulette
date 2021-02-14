import io from 'socket.io-client';

import { SOCKET_URL } from '@/constants/helpers';

import { ChatSocket } from '@/classes/socket/ChatSocket';
import { AppSocket } from '@/classes/socket/AppSocket';

const socket = io(SOCKET_URL);

export const appSocket = new AppSocket(socket);
export const chatSocket = new ChatSocket(socket);
