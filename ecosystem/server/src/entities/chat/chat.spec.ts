import { makeFakeGlobalChatWithThreeInitialMessages } from "@entities/chat"
import { makeFakeUser } from "@entities/user"
import { Message } from "@entities/message"
import { Content, Id } from "@entities/message/values"

describe("Entitiy Chat Tests", () => {
  test("should be initialize Chat entity in global mode, receiving an Message Bucket", () => {
    const { chat, fakeMessageBucket, fakeChatId } = makeFakeGlobalChatWithThreeInitialMessages();
    expect(chat).toEqual({
      id: fakeChatId,
      messages: fakeMessageBucket
    })
  })

  test("should be add unique message in Chat instance", () => {
    const { chat } = makeFakeGlobalChatWithThreeInitialMessages();

    const fakeId = new Id("any_id");
    const fakeUser = makeFakeUser();
    const fakeContent = new Content("new_message");
    const newMessage = new Message(fakeId, fakeUser, fakeContent)

    expect(chat.addMessage(newMessage)).toBeTruthy();
  })
})
