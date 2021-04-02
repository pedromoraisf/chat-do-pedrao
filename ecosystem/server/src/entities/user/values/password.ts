import { Either, right, left } from '@shared/either';
import { InvalidPasswordError } from '@entities/user/errors';

export class Password {
  private readonly password: string;

  constructor(password: string) {
    this.password = password;
  }

  get value(): string {
    return this.password;
  }

  static create(password: string): Either<InvalidPasswordError, Password> {
    if (!Password.verifyLength(password)) return left(new InvalidPasswordError(password));

    return right(new Password(password));
  }

  static verifyLength(password: string): boolean {
    const MIN_LEN = 5;

    return !!(password && password.length > MIN_LEN);
  }
}
