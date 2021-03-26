import { InitializeChat } from "@usecases/initialize-chat"
import { FakeMessagesRepository } from "@usecases/output-ports/repositories"
import { FakeWebSocket } from "@usecases/output-ports/communications/web-socket"
import { LoadMessagesError } from "@usecases/errors"
import { InfraError } from "@usecases/output-ports/errors"
import { left } from "@shared/either"

interface SutTypes {
  sut: InitializeChat
  fakeMessagesRepository: FakeMessagesRepository
  fakeWebSocket: FakeWebSocket
}

const makeSut = (): SutTypes => {
  const fakeMessagesRepository = new FakeMessagesRepository();
  const fakeWebSocket = new FakeWebSocket();
  const sut = new InitializeChat(fakeMessagesRepository, fakeWebSocket);

  return {
    sut,
    fakeMessagesRepository,
    fakeWebSocket
  }
}

describe("Use Case Initialize Chat Tests", () => {
  test("should be call adapter method correctly", async () => {
    const { sut, fakeMessagesRepository } = makeSut();

    const spyAdapter = jest.spyOn(sut, "adapterRepoMessagesInEntityMessages");
    await sut.init()

    const fakeMessages = await fakeMessagesRepository.retrievMessages()
    expect(spyAdapter).toHaveBeenCalledWith(fakeMessages.value);
  })

  test("should be trace error case in initialize chat", async () => {
    const { sut, fakeMessagesRepository } = makeSut();

    const spyRetrievMessages = jest.spyOn(fakeMessagesRepository, "retrievMessages");
    spyRetrievMessages.mockImplementation(() => {
      const res = new InfraError()
      return new Promise(resolve => resolve(left(res)))
    })

    const testable = await sut.init();

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new LoadMessagesError(new InfraError().message))
  })

  test("should be call web socket inverted dependency correctly", async () => {
    const { sut, fakeWebSocket } = makeSut();

    const spyFakeWebSocket = jest.spyOn(fakeWebSocket, "initializeChatOnTheListener");

    await sut.init();

    expect(spyFakeWebSocket).toHaveBeenCalledTimes(1)
  })
})
