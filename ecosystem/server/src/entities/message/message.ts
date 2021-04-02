import { User } from '@entities/user';
import { Id, Content } from '@entities/message/values';

interface MessageContent {
  message: string;
}

export class Message {
  public readonly id: Id;

  public readonly sender: User;

  public readonly content: Content;

  constructor(id: Id, sender: User, content: Content) {
    this.id = id;
    this.sender = sender;
    this.content = content;
  }

  static create(messageId: string, sender: User, messageContent: MessageContent): Message {
    const id = new Id(messageId);
    const content = new Content(messageContent.message);
    return new Message(id, sender, content);
  }
}
