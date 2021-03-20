import { Chat } from "@entities/chat"
import { makeFakeMessage } from "@entities/message"
import { makeFakeUser } from "@entities/user"
import { Message } from "@entities/message"
import { Content } from "@entities/message/values"

const makeFakeChatWithThreeInitialMessages = () => {
  const { sut } = makeSut();

  const fakeMessage = makeFakeMessage();
  const fakeMessageBucket = {
    messages: [fakeMessage, fakeMessage, fakeMessage]
  }

  return {
    chat: sut.bootstrap(fakeMessageBucket),
    fakeMessageBucket
  }
}

const makeSut = () => {
  const sut = Chat

  return {
    sut
  }
}

describe("Entitiy Chat Tests", () => {
  test("should be initialize Chat entity, receiving an Message Bucket", () => {
    const { chat, fakeMessageBucket } = makeFakeChatWithThreeInitialMessages();
    expect(chat).toEqual(fakeMessageBucket)
  })

  test("should be add unique message in Chat instance", () => {
    const { chat } = makeFakeChatWithThreeInitialMessages();

    const fakeUser = makeFakeUser();
    const fakeContent = new Content("new_message");
    const newMessage = new Message(fakeUser, fakeContent)

    expect(chat.addMessage(newMessage)).toBeTruthy();
  })
})
