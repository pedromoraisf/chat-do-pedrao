import { UserSendMessageController } from '@presentation/controllers/wss/user-send-message';
import { UserSendMessage } from '@usecases/user-send-message';
import { MessagesRepo } from '@external/mongodb/messages';

export const makeUserSendMessageController = (): UserSendMessageController => {
  const messagesRepository = new MessagesRepo();
  const userSendMessageUseCase = new UserSendMessage(messagesRepository);
  return new UserSendMessageController(userSendMessageUseCase);
};
