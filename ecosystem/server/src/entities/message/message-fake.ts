import { makeFakeUser } from "@entities/user"
import { Message } from "@entities/message"
import { Id, Content } from "@entities/message/values"

export const makeFakeMessage = (): Message => {
  const id = new Id("any_id")
  const fakeUser = makeFakeUser();
  const fakeContent = new Content("any_fake_message_content");

  return new Message(id, fakeUser, fakeContent)
}
