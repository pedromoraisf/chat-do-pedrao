import { Controller, PayloadReturn } from '@presentation/controllers/wss/protocols';
import { Socket } from 'socket.io';

export const adaptUserSendMessage = (socket: Socket, controller: Controller) => {
  return async (payload: any) => {
    const controllerReponse: PayloadReturn = await controller.handle(payload);
    socket.emit('broadcast-user-send-message', controllerReponse);
    socket.broadcast.emit('broadcast-user-send-message', controllerReponse);
  };
};
