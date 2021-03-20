import { Chat } from "@entities/chat"
import { makeFakeMessage } from "@entities/message"

const makeSut = () => {
  const sut = Chat

  return {
    sut
  }
}

describe("Entitiy Chat Tests", () => {
  test("should be initialize Chat entity, receiving an Message Bucket", () => {
    const { sut } = makeSut();

    const fakeMessage = makeFakeMessage();
    const fakeMessageBucket = {
      messages: [fakeMessage, fakeMessage, fakeMessage]
    }

    const testable = sut.create(fakeMessageBucket)
    expect(testable).toEqual(fakeMessageBucket)
  })
})
