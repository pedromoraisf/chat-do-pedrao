/**
 * REQUIREMENTS: 
 * 1. Instâncio as entidades
 * 2. Vejo se não deu nenhum b.o
 * 3. Salvo na persistencia de dados
 * 4. Retorno a mensagem no padrão entidade
 */

import { Message } from "@entities/message"
import { User } from "@entities/user"
import { MessagePack } from "@usecases/user-send-message"
import { InvalidNameError, InvalidUsernameError, InvalidPasswordError } from "@entities/user/errors"
// import { MessagesRepository } from "@usecases/output-ports/repositories"
import { Either, left, right } from "@shared/either"

export class UserSendMessage {
  // private readonly messagesRepository: MessagesRepository;

  // constructor(messagesRepository: MessagesRepository) {
  //   this.messagesRepository = messagesRepository
  // }

  async send(messagePack: MessagePack): Promise<Either<InvalidNameError | InvalidUsernameError, Message>> {
    const messageOrError = this.adaptReceivedPackInEntityFormat(messagePack);
    if (messageOrError.isLeft()) return left(messageOrError.value);

    return right(messageOrError.value)
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
