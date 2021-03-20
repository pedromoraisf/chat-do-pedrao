import { Name, Username, Password } from "@entities/user/values"
import { InvalidNameError, InvalidUsernameError, InvalidPasswordError } from "@entities/user/errors"
import { Either, left, right } from "@shared/either"

interface UserData {
  name: string;
  username: string;
  password: string;
}

export class User {
  private readonly name: Name;
  private readonly username: Username;
  private readonly password: Password;

  constructor(name: Name, username: Username, password: Password) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  static create(userData: UserData): Either<InvalidNameError | InvalidUsernameError, User> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(userData.name);
    if (nameOrError.isLeft()) return left(new InvalidNameError(nameOrError.value.message))

    const usernameOrError: Either<InvalidUsernameError, Username> = Username.create(userData.username);
    if (usernameOrError.isLeft()) return left(new InvalidUsernameError(usernameOrError.value.message))

    const passwordOrError: Either<InvalidPasswordError, Password> = Password.create(userData.password);
    if (passwordOrError.isLeft()) return left(new InvalidPasswordError(passwordOrError.value.message))

    const name: Name = nameOrError.value;
    const username: Username = usernameOrError.value;
    const password: Password = passwordOrError.value

    return right(new User(name, username, password))
  }
}
