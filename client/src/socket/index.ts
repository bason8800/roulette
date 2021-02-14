import io from 'socket.io-client';

import { SOCKET_URL } from '@/constants/helpers';
import { ChatSocket } from '@/classes/socket/ChatSocket';

const socket = io(SOCKET_URL);

export const chatSocket = new ChatSocket(socket);
