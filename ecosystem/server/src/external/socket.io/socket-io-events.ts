/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { WebSocket } from "@usecases/output-ports/communications/web-socket"
import { Chat } from "@entities/chat"
import { Socket } from "socket.io"

export class SocketIoEvents implements WebSocket {
  private readonly serverSocket: Socket;

  constructor(serverSocket: Socket) {
    this.serverSocket = serverSocket
  }

  async sendBroadcastToAllListeners(payload: any): Promise<void> {
    this.serverSocket.emit("broadcast-to-all-listeners", payload);
  }

  async initializeChatOnTheListener(chat: Chat): Promise<void> {
    this.serverSocket.emit("initialize-chat", chat);
  }
}
