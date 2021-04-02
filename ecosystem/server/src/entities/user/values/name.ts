import { Either, right, left } from '@shared/either';
import { InvalidNameError } from '@entities/user/errors';

export class Name {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  get value(): string {
    return this.name;
  }

  static create(name: string): Either<InvalidNameError, Name> {
    const cleanedName = Name.clean(name);
    if (!Name.verifyLength(cleanedName)) return left(new InvalidNameError(name));

    return right(new Name(cleanedName));
  }

  static clean(name: string): string {
    if (!(name && typeof name === 'string')) return '';

    return name.trim();
  }

  static verifyLength(name: string): boolean {
    const MIN_LEN = 2;
    const MAX_LEN = 255;

    return !!(name && name.length >= MIN_LEN && name.length <= MAX_LEN);
  }
}
