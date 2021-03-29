interface UserReceive {
  id: string;
  name: string;
  username: string;
  password: string;
}

interface MessageContent {
  message: string;
}

export interface MessagePack {
  id: string;
  user: UserReceive;
  content: MessageContent;
}
