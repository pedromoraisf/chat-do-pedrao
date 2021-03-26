import { MessagesRepo } from "@external/mongodb/messages"
import { MongoHelper } from "@external/mongodb/helpers"
import { makeFakeMessage } from "@entities/message"
import { InfraError } from "@usecases/output-ports/errors";

const makeSut = () => {
  const sut = new MessagesRepo();

  return {
    sut
  }
}

describe("saveMessage Tests", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? "")
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const { sut } = makeSut();
    const collection = await MongoHelper.getCollection(sut.COLLECTION_NAME)
    await collection.deleteMany({})
  })

  test("should be save message correctly", async () => {
    const { sut } = makeSut();

    const fakeMessage = makeFakeMessage();
    const testable = await sut.saveMessage(fakeMessage);

    expect(testable.isRight()).toBeTruthy();
    if (testable.isRight()) {
      expect(testable.value.message).toBe(fakeMessage.content.value);
      expect(testable.value.user.name).toBe(fakeMessage.sender.name.value);
      expect(testable.value.user.username).toBe(fakeMessage.sender.username.value);
      expect(testable.value.user.password).toBe(fakeMessage.sender.password.value);
    }
  })

  test("should be returns isLeft if infra error case", async () => {
    const { sut } = makeSut();

    jest.spyOn(MongoHelper, "getCollection").mockImplementationOnce(async () => {
      const errorRes = new Error("any_external_error")
      return new Promise((resolve, reject) => reject(errorRes))
    });
    const testable = await sut.retrievMessages();

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new InfraError())
  })
})
