/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chat } from "@entities/chat"
import { makeFakeMessage } from "@entities/message";

export const makeFakeChatWithThreeInitialMessages = (): any => {
  const fakeMessage = makeFakeMessage();
  const fakeMessageBucket = [fakeMessage, fakeMessage, fakeMessage]

  return {
    chat: new Chat(fakeMessageBucket),
    fakeMessageBucket
  }
}
