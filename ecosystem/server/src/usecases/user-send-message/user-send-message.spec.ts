import { InvalidNameError } from "@entities/user/errors"
import { UserSendMessage, MessagePack } from "@usecases/user-send-message"
import { FakeMessagesRepository } from "@usecases/output-ports/repositories"

const makeFakeMessagePack = (): MessagePack => ({
  user: {
    id: "any_id",
    name: "any_name",
    username: "any_username",
    password: "any_password"
  },
  content: {
    message: "any_message"
  }
})

const makeSut = () => {
  const makeFakeMessagesRepository = new FakeMessagesRepository();
  const sut = new UserSendMessage(makeFakeMessagesRepository);

  return {
    sut
  };
}

describe("Use Case User Send Message Tests", () => {
  test("should be call adapter method correctly", async () => {
    const { sut } = makeSut();

    const spyAdapter = jest.spyOn(sut, "adaptReceivedPackInEntityFormat");
    const fakeMessagePack = makeFakeMessagePack();
    await sut.send(fakeMessagePack);

    expect(spyAdapter).toHaveBeenCalledWith(fakeMessagePack)
  })

  test("simulate error cases in adapter to entity method", async () => {
    const { sut } = makeSut();

    const fakeWrongMessagePack = makeFakeMessagePack();
    fakeWrongMessagePack.user.name = "";

    const testable = await sut.send(fakeWrongMessagePack);

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new InvalidNameError(fakeWrongMessagePack.user.name))
  })
})
