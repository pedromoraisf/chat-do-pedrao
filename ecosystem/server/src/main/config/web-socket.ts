/* eslint-disable no-console */
import { Express } from 'express';
import { Server } from 'socket.io';
import http from 'http';

export default (app: Express): void => {
  const server = http.createServer(app);
  const io = new Server(server, {
    transports: ['websocket', 'polling']
  });

  io.on('connection', (socket) => {
    console.log(`>> Connection socket: ${socket.id}`);
  });
};
