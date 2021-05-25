import { Id } from '@entities/chat/values';
import { Message } from '@entities/message';

interface MessageBucket {
  messages: Array<Message>;
}

export class Chat {
  public id: Id;

  public messages: Array<Message>;

  constructor(id: Id, message?: Array<Message>) {
    this.id = id;
    if (message) this.messages = message;
  }

  static bootstrap(chatId: string, messageBucket: MessageBucket): Chat {
    const proxiateChatId = this.proxiateChatId(chatId);
    const id = new Id(proxiateChatId);
    return new Chat(id, messageBucket.messages);
  }

  static proxiateChatId(chatId?: string): string {
    return chatId || this.initChatGlobal();
  }

  static initChatGlobal(): string {
    return 'global_chat';
  }

  addMessage(message: Message): boolean {
    this.messages.push(message);
    return !!this.messages.includes(message);
  }

  public getClean() {
    return {
      id: this.id.value,
      messages: this.messages.map((message) => message.getClean())
    };
  }
}
