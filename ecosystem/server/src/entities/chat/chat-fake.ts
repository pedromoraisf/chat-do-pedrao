/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chat } from "@entities/chat"
import { Id } from "@entities/chat/values"
import { makeFakeMessage } from "@entities/message";

export const makeFakeGlobalChatWithThreeInitialMessages = (): any => {
  const fakeChatId = new Id(Chat.initChatGlobal())
  const fakeMessage = makeFakeMessage();
  const fakeMessageBucket = [fakeMessage, fakeMessage, fakeMessage]

  return {
    chat: new Chat(fakeChatId, fakeMessageBucket),
    fakeMessageBucket,
    fakeChatId
  }
}
