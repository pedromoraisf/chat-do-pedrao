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
import { Either, left, right } from "@shared/either"

export class UserSendMessage {
  async send(messagePack: MessagePack): Promise<Either<Error, Message>> {
    const messageOrError = this.adaptReceivedPackInEntityFormat(messagePack);
    if (messageOrError.isLeft()) return left(messageOrError.value);

    return right(messageOrError.value)
  }

  adaptReceivedPackInEntityFormat(messagePack: MessagePack): Either<Error, Message> {
    const userOrError = User.create({
      name: messagePack.userData.name,
      username: messagePack.userData.username,
      password: messagePack.userData.password
    })
    if (userOrError.isLeft()) return left(userOrError.value)

    return right(Message.create(userOrError.value, messagePack));
  }
}
