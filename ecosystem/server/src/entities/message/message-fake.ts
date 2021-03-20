import { makeFakeUser } from "@entities/user"
import { Message } from "@entities/message"
import { Content } from "@entities/message/values"

export const makeFakeMessage = (): Message => {
  const fakeUser = makeFakeUser();
  const fakeContent = new Content("any_fake_message_content");

  return new Message(fakeUser, fakeContent)
}
