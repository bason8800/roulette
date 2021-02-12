import io from 'socket.io-client';

import { ChatSocket } from '@/classes/socket/ChatSocket';

const socket = io('http://localhost:3000');

export const chatSocket = new ChatSocket(socket);
