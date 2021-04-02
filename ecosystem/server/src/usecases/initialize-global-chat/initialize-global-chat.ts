import { User } from '@entities/user';
import { Chat } from '@entities/chat';
import { Message } from '@entities/message';
import { MessagesRepository, SavedMessage } from '@usecases/output-ports/repositories';
import { LoadMessagesError } from '@usecases/errors';
import { Either, left, right } from '@shared/either';

export class InitializeGlobalChat {
  private readonly messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository;
  }

  async init(chatId?: string): Promise<Either<LoadMessagesError, Chat>> {
    const savedInRepositoryMessages = await this.messagesRepository.retrievMessages();
    if (savedInRepositoryMessages.isLeft()) {
      return left(new LoadMessagesError(savedInRepositoryMessages.value.message));
    }

    const adaptedMessages = this.adapterRepoMessagesInEntityMessages(savedInRepositoryMessages.value);
    const ADAPTED_CHAT_ID = chatId || '';
    const chat = Chat.bootstrap(ADAPTED_CHAT_ID, {
      messages: adaptedMessages
    });

    return right(chat);
  }

  adapterRepoMessagesInEntityMessages(repoMessages: Array<SavedMessage>): Array<Message> {
    const adaptedInterface: Message[] = [];

    for (let i = 0; i < repoMessages.length; i += 1) {
      const message = repoMessages[i];
      const userOrError = User.create({
        id: message.user.id,
        name: message.user.name,
        username: message.user.username,
        password: message.user.password
      });
      if (userOrError.isRight()) {
        const messageInstance = Message.create(message.id, userOrError.value, message);
        adaptedInterface.push(messageInstance);
      }
    }

    return adaptedInterface;
  }
}
