import { Message } from "@entities/message"
import { User } from "@entities/user"
import { MessagePack } from "@usecases/user-send-message"
import { InvalidNameError, InvalidUsernameError, InvalidPasswordError } from "@entities/user/errors"
import { MessagesRepository, SaveMessageResponse } from "@usecases/output-ports/repositories"
import { Either, left, right } from "@shared/either"

export class UserSendMessage {
  private readonly messagesRepository: MessagesRepository;

  constructor(messagesRepository: MessagesRepository) {
    this.messagesRepository = messagesRepository
  }

  async send(messagePack: MessagePack): Promise<Either<InvalidNameError | InvalidUsernameError, Message>> {
    const adaptedMessageOrError = this.adaptReceivedPackInEntityFormat(messagePack);
    if (adaptedMessageOrError.isLeft()) return left(adaptedMessageOrError.value);

    const saveMessageInRepositoryOrError: SaveMessageResponse = await this.messagesRepository.saveMessage(adaptedMessageOrError.value)
    if (saveMessageInRepositoryOrError.isLeft()) return left(saveMessageInRepositoryOrError.value)

    return right(adaptedMessageOrError.value)
  }

  adaptReceivedPackInEntityFormat(messagePack: MessagePack): Either<InvalidNameError | InvalidUsernameError | InvalidPasswordError, Message> {
    const userOrError = User.create({
      id: messagePack.user.id,
      name: messagePack.user.name,
      username: messagePack.user.username,
      password: messagePack.user.password
    })
    if (userOrError.isLeft()) return left(userOrError.value)

    return right(Message.create(userOrError.value, messagePack.content));
  }
}
