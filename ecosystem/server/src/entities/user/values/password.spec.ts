import { Password } from '@entities/user/values';
import { InvalidPasswordError } from '@entities/user/errors';

const makeSut = () => {
  const sut = Password;

  return {
    sut
  };
};

describe('Value Password Tests', () => {
  test('should be returns isLeft containing InvalidPasswordError if password with < 5 chars has been inputed', () => {
    const { sut } = makeSut();

    const wrongPassoword = 'wron';
    expect(sut.create(wrongPassoword).value).toEqual(new InvalidPasswordError(wrongPassoword));
  });
});
