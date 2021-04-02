import { Either, right, left } from '@shared/either';
import { InvalidUsernameError } from '@entities/user/errors';

export class Username {
  private readonly username: string;

  constructor(username: string) {
    this.username = username;
  }

  get value(): string {
    return this.username;
  }

  static create(username: string): Either<InvalidUsernameError, Username> {
    const cleanedUsername = Username.clean(username);
    if (!Username.verifyLength(cleanedUsername)) return left(new InvalidUsernameError(username));

    return right(new Username(cleanedUsername));
  }

  static clean(username: string): string {
    if (!(username && typeof username === 'string')) return '';

    return username.trim();
  }

  static verifyLength(username: string): boolean {
    const MIN_LEN = 2;
    const MAX_LEN = 50;

    return !!(username && username.length >= MIN_LEN && username.length <= MAX_LEN);
  }
}
