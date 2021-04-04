import { UserEntryInConnectionController } from '@presentation/controllers/wss/user-entry-in-connection';
import { InitializeGlobalChat } from '@usecases/initialize-global-chat';
import { MessagesRepo } from '@external/mongodb/messages';

export const makeUserEntryInConnectionController = (): UserEntryInConnectionController => {
  const messagesRepository = new MessagesRepo();
  const initializeGlobalChatUseCase = new InitializeGlobalChat(messagesRepository);
  return new UserEntryInConnectionController(initializeGlobalChatUseCase);
};
