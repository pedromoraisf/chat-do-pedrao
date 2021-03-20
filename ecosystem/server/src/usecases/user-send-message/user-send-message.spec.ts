import { UserSendMessage, MessagePack } from "@usecases/user-send-message"

const makeFakeMessagePack = (): MessagePack => ({
  message: "any_message",
  userData: {
    name: "any_name",
    username: "any_username",
    password: "any_password"
  }
})

const makeSut = () => {
  const sut = new UserSendMessage();

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
})
