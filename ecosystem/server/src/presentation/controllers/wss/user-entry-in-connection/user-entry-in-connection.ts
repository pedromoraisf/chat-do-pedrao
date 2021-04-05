import { Controller, PayloadReturn } from '@presentation/controllers/wss/protocols';
import { InitializeGlobalChat } from '@usecases/initialize-global-chat';
import { ok } from '@presentation/controllers/wss/helpers/responses';
import { mapError } from '@presentation/controllers/wss/helpers/error-mapper';

export class UserEntryInConnectionController implements Controller {
  protected readonly initializeGlobalChatUseCase: InitializeGlobalChat;

  constructor(initializeGlobalChatUseCase: InitializeGlobalChat) {
    this.initializeGlobalChatUseCase = initializeGlobalChatUseCase;
  }

  async handle(): Promise<PayloadReturn> {
    try {
      const initGlobalChat = await this.initializeGlobalChatUseCase.init();
      if (initGlobalChat.isLeft()) return mapError(initGlobalChat.value.layer)(initGlobalChat.value);
      return ok(initGlobalChat);
    } catch (e) {
      const error = e.value;
      return mapError(error.layer)(error);
    }
  }
}
