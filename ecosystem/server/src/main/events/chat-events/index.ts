import { adaptUserEntryInConnection } from '@main/adapters/adapt-user-entry-in-connection';
import { adaptUserSendMessage } from '@main/adapters/adapt-user-send-message';
import { makeUserEntryInConnectionController } from '@main/factories/user-entry-in-connection';
import { makeUserSendMessageController } from '@main/factories/user-send-message';
import { Socket } from 'socket.io';

export default (socket: Socket): void => {
  socket.on('user-entry-in-connection', adaptUserEntryInConnection(socket, makeUserEntryInConnectionController()));
  socket.on('user-send-message', adaptUserSendMessage(socket, makeUserSendMessageController()));
};
