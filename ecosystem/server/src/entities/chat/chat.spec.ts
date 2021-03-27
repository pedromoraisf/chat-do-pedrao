import { makeFakeChatWithThreeInitialMessages } from "@entities/chat"
import { makeFakeUser } from "@entities/user"
import { Message } from "@entities/message"
import { Content } from "@entities/message/values"

describe("Entitiy Chat Tests", () => {
  test("should be initialize Chat entity, receiving an Message Bucket", () => {
    const { chat, fakeMessageBucket } = makeFakeChatWithThreeInitialMessages();
    expect(chat).toEqual({
      messages: fakeMessageBucket
    })
  })

  test("should be add unique message in Chat instance", () => {
    const { chat } = makeFakeChatWithThreeInitialMessages();

    const fakeUser = makeFakeUser();
    const fakeContent = new Content("new_message");
    const newMessage = new Message(fakeUser, fakeContent)

    expect(chat.addMessage(newMessage)).toBeTruthy();
  })
})
