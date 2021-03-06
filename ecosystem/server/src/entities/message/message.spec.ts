import { makeFakeUser } from '@entities/user';
import { Message } from '@entities/message';
import { Content, Id } from '@entities/message/values';

const makeSut = () => {
  const sut = Message;

  return {
    sut
  };
};

describe('Entitiy Message Tests', () => {
  test('behavior of message instance', () => {
    const { sut } = makeSut();

    const fakeId = 'any_id';
    const fakeUser = makeFakeUser();
    const fakeMessageContent = {
      message: 'any_message'
    };
    const testable = sut.create(fakeId, fakeUser, fakeMessageContent);
    expect(testable).toEqual({
      id: new Id(fakeId),
      sender: fakeUser,
      content: new Content(fakeMessageContent.message)
    });
    expect(testable.content.value).toEqual(fakeMessageContent.message);
  });

  test('should be returns adapted data in getClean', () => {
    const { sut } = makeSut();

    const fakeId = 'any_id';
    const fakeUser = makeFakeUser();
    const fakeMessageContent = {
      message: 'any_message'
    };
    const testable = sut.create(fakeId, fakeUser, fakeMessageContent);

    expect(testable.getClean()).toEqual({
      id: 'any_id',
      sender: {
        id: 'any_id',
        name: 'any_name',
        username: 'any_username',
        password: 'any_password'
      },
      content: {
        message: 'any_message'
      }
    });
  });
});
