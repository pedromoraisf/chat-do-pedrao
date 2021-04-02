import { PayloadReceive, PayloadReturn } from '@presentation/controllers/wss/protocols';

export interface Controller {
  handle: (payloadReceive?: PayloadReceive) => Promise<PayloadReturn>;
}
