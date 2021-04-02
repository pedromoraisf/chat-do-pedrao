import { Username } from '@entities/user/values';
import { InvalidUsernameError } from '@entities/user/errors';

const makeSut = () => {
  const sut = Username;

  return {
    sut
  };
};

describe('Value Username Tests', () => {
  test('should be returns isLeft containing InvalidUsernameError if invalid username has been inputed', () => {
    const { sut } = makeSut();

    const wrongUsername = '  ';
    expect(sut.create(wrongUsername).value).toEqual(new InvalidUsernameError(wrongUsername));
  });
});
