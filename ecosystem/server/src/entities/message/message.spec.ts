import { makeFakeUser } from "@entities/user"
import { Message } from "@entities/message"
import { Content } from "@entities/message/values"

const makeSut = () => {
  const sut = Message

  return {
    sut
  }
}

describe("Entitiy Message Tests", () => {
  test("behavior of message instance", () => {
    const { sut } = makeSut();

    const fakeUser = makeFakeUser();
    const fakeMessageContent = {
      message: "any_message"
    }
    const testable = sut.create(fakeUser, fakeMessageContent)
    expect(testable).toEqual({
      sender: fakeUser,
      content: new Content(fakeMessageContent.message)
    })
    expect(testable.content.value).toEqual(fakeMessageContent.message)
  })
})
