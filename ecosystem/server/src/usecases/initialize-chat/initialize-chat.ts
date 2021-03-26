import { User } from "@entities/user"
import { Chat } from "@entities/chat"
import { Message } from "@entities/message"
import { MessagesRepository, SavedMessage } from "@usecases/output-ports/repositories"
import { WebSocket } from "@usecases/output-ports/communications/web-socket"
import { LoadMessagesError } from "@usecases/errors"
import { Either, left, right } from "@shared/either"

export class InitializeChat {
  private readonly messagesRepository: MessagesRepository;
  private readonly webSocket: WebSocket;

  constructor(messagesRepository: MessagesRepository, webSocket: WebSocket) {
    this.messagesRepository = messagesRepository
    this.webSocket = webSocket
  }

  async init(): Promise<Either<LoadMessagesError, Chat>> {
    const savedInRepositoryMessages = await this.messagesRepository.retrievMessages();
    if (savedInRepositoryMessages.isLeft()) {
      return left(new LoadMessagesError(savedInRepositoryMessages.value.message))
    }
    const adaptedMessages = this.adapterRepoMessagesInEntityMessages(savedInRepositoryMessages.value);

    const chat = Chat.bootstrap({
      messages: adaptedMessages
    })

    this.webSocket.sendBroadcastToAllListeners(chat);

    return right(chat)
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
