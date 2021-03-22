import { User } from "@entities/user"
import { Chat } from "@entities/chat"
import { Message } from "@entities/message"
import { MessagesRepository, SavedMessage } from "@usecases/output-ports/repositories"
import { LoadMessagesError } from "@usecases/errors"
import { Either, left, right } from "@shared/either"

export class InitializeChat {
  private readonly messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository
  }

  async init(): Promise<Either<LoadMessagesError, Chat>> {
    const savedInRepositoryMessages = await this.messagesRepository.retrievMessages();
    if (savedInRepositoryMessages.isLeft()) {
      return left(new LoadMessagesError(savedInRepositoryMessages.value.message))
    }
    const adaptedMessages = this.adapterRepoMessagesInEntityMessages(savedInRepositoryMessages.value);

    return right(Chat.bootstrap({
      messages: adaptedMessages
    }))
  }

  adapterRepoMessagesInEntityMessages(repoMessages: Array<SavedMessage>): Array<Message> {
    const adaptedInterface: Message[] = [];

    for (let i = 0; i < repoMessages.length; i++) {
      const message = repoMessages[i];
      const userOrError = User.create({
        id: message.user.id,
        name: message.user.name,
        username: message.user.username,
        password: message.user.password
      });
      if (userOrError.isRight()) {
        const messageInstance = Message.create(userOrError.value, message)
        adaptedInterface.push(messageInstance)
      }
    }

    return adaptedInterface;
  }
}
