import { Message } from "@entities/message"

interface MessageBucket {
  messages: Array<Message>
}

export class Chat {
  public messages: Array<Message>

  constructor(message?: Array<Message>) {
    if (message) this.messages = message;
  }

  static bootstrap(messageBucket: MessageBucket): Chat {
    return new Chat(messageBucket.messages)
  }

  addMessage(message: Message): boolean {
    this.messages.push(message)
    return !!this.messages.includes(message)
  }
}
