/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebSocket } from "@usecases/output-ports/communications/web-socket"

export class FakeWebSocket implements WebSocket {
  async sendBroadcastToAllListeners(payload: any): Promise<void> {
    // 
  }
}
