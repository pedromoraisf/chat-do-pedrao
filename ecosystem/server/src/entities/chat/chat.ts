import { Message } from "@entities/message"

interface MessageBucket {
  messages: Array<Message>
}

export class Chat {
  public readonly messages: Array<Message>

  constructor(message: Array<Message>) {
    this.messages = message;
  }

  static create(messageBucket: MessageBucket): Chat {
    return new Chat(messageBucket.messages)
  }
}
