import { UserSendMessage, MessagePack } from '@usecases/user-send-message';
import { Controller, PayloadReceive, PayloadReturn } from '@presentation/controllers/wss/protocols';
import { badRequest, ok } from '@presentation/controllers/wss/helpers/responses';
import { MissingParamError } from '@presentation/errors';
import { mapError } from '@presentation/controllers/wss/helpers/error-mapper';

export class UserSendMessageController implements Controller {
  protected readonly userSendMessageUseCase: UserSendMessage;

  protected readonly payloadReceiveTypes: MessagePack = {
    id: '',
    user: {
      id: '',
      name: '',
      username: '',
      password: ''
    },
    content: {
      message: ''
    }
  };

  constructor(userSendMessageUseCase: UserSendMessage) {
    this.userSendMessageUseCase = userSendMessageUseCase;
  }

  async handle(payloadReceive: PayloadReceive): Promise<PayloadReturn> {
    const normalizedPayloadReceive = this.normalizePayloadReceive(payloadReceive);
    if (normalizedPayloadReceive.id === '' || normalizedPayloadReceive.user.id === '')
      return badRequest(new MissingParamError('Id is not provided'));

    try {
      const userMessage = await this.userSendMessageUseCase.send(normalizedPayloadReceive);
      return ok(userMessage.value);
    } catch (e) {
      const error = e.value;
      return mapError(error.name)(error);
    }
  }

  protected normalizePayloadReceive(payloadReceive: PayloadReceive): MessagePack {
    return { ...this.payloadReceiveTypes, ...payloadReceive };
  }
}
