import { User } from "@entities/user"
import { Content } from "@entities/message/values"

interface MessageContent {
  message: string;
}

export class Message {
  public readonly sender: User;
  public readonly content: Content;

  constructor(sender: User, content: Content) {
    this.sender = sender;
    this.content = content;
  }

  static create(sender: User, messageContent: MessageContent): Message {
    const content = new Content(messageContent.message)
    return new Message(sender, content)
  }
}
