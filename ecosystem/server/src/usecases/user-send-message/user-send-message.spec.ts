import { InvalidNameError } from "@entities/user/errors"
import { UserSendMessage, MessagePack } from "@usecases/user-send-message"
import { FakeMessagesRepository } from "@usecases/output-ports/repositories"
import { FakeWebSocket } from "@usecases/output-ports/communications/web-socket"

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
  const fakeMessagesRepository = new FakeMessagesRepository();
  const fakeWebSocket = new FakeWebSocket();
  const sut = new UserSendMessage(fakeMessagesRepository, fakeWebSocket);

  return {
    sut,
    fakeWebSocket
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

  test("should be call web socket inverted dependency correctly", async () => {
    const { sut, fakeWebSocket } = makeSut();

    const spyFakeWebSocket = jest.spyOn(fakeWebSocket, "sendBroadcastToAllListeners");

    const fakeMessagePack = makeFakeMessagePack()
    const adaptedMessagePack = sut.adaptReceivedPackInEntityFormat(fakeMessagePack);

    await sut.send(fakeMessagePack);

    expect(spyFakeWebSocket).toHaveBeenCalledTimes(1)
    expect(spyFakeWebSocket).toHaveBeenCalledWith(adaptedMessagePack.value)
  })
})
