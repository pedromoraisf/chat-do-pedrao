import { Controller, PayloadReturn } from '@presentation/controllers/wss/protocols';
import { InitializeGlobalChat } from '@usecases/initialize-global-chat';
import { serverError, ok } from '@presentation/controllers/wss/helpers/wss-helper';

export class UserEntryInConnectionController implements Controller {
  protected initializeGlobalChatUseCase: InitializeGlobalChat;

  constructor(initializeGlobalChatUseCase: InitializeGlobalChat) {
    this.initializeGlobalChatUseCase = initializeGlobalChatUseCase;
  }

  async handle(): Promise<PayloadReturn> {
    try {
      const initGlobalChat = await this.initializeGlobalChatUseCase.init();
      return ok(initGlobalChat);
    } catch (error) {
      return serverError(error);
    }
  }
}
