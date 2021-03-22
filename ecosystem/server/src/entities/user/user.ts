import { Name, Username, Password } from "@entities/user/values"
import { InvalidNameError, InvalidUsernameError, InvalidPasswordError } from "@entities/user/errors"
import { UserData } from "@entities/user"
import { Either, left, right } from "@shared/either"

export class User {
  public readonly name: Name;
  public readonly username: Username;
  public readonly password: Password;

  constructor(name: Name, username: Username, password: Password) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  static create(userData: UserData): Either<InvalidNameError | InvalidUsernameError | InvalidPasswordError, User> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(userData.name);
    if (nameOrError.isLeft()) return left(nameOrError.value)

    const usernameOrError: Either<InvalidUsernameError, Username> = Username.create(userData.username);
    if (usernameOrError.isLeft()) return left(usernameOrError.value)

    const passwordOrError: Either<InvalidPasswordError, Password> = Password.create(userData.password);
    if (passwordOrError.isLeft()) return left(passwordOrError.value)

    const name: Name = nameOrError.value;
    const username: Username = usernameOrError.value;
    const password: Password = passwordOrError.value

    return right(new User(name, username, password))
  }
}
