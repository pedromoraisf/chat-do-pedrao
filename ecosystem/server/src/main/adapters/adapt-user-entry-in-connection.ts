import { Controller, PayloadReturn } from '@presentation/controllers/wss/protocols';
import { Socket } from 'socket.io';

export const adaptUserEntryInConnection = (socket: Socket, controller: Controller) => {
  return async (payload: any) => {
    const controllerReponse: PayloadReturn = await controller.handle(payload);
    socket.emit('response-user-entry-in-connection', controllerReponse);
  };
};
