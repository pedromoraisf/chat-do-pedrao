/* eslint-disable no-console */
import { Express } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import chatEvents from '@main/events/chat-events';

export default (app: Express): void => {
  const server = http.createServer(app);
  const io = new Server(server, {
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket: Socket) => {
    chatEvents(socket);
  });
};
