/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chat } from "@entities/chat"

export interface WebSocket {
  sendBroadcastToAllListeners(payload: any): Promise<void>;
  initializeChatOnTheListener(chat: Chat): Promise<void>;
}
