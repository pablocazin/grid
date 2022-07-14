import io from 'socket.io-client';
import { CONFIG } from '../config';

const socket = io(
  `${CONFIG.SERVER_URL}`,
  {
    reconnectionDelay: 500,
    reconnectionAttempts: 10,
    reconnection: true,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

export { socket };