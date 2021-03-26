/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WebSocket {
  sendBroadcastToAllListeners(payload: any): Promise<void>;
}
