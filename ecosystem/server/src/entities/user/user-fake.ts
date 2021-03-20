import { User } from "@entities/user"
import { Name, Username, Password } from "@entities/user/values"

export const makeFakeUser = (): User => {
  const name = new Name("any_name");
  const username = new Username("any_username");
  const password = new Password("any_password");

  return new User(name, username, password)
}
