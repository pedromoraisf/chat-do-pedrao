import { UserSendMessageController } from '@presentation/controllers/wss/user-send-message';
import { UserSendMessage } from '@usecases/user-send-message';
import { FakeMessagesRepository } from '@usecases/output-ports/repositories';
import { left } from '@shared/either';
import { InfraError } from '@usecases/output-ports/errors';

const makeFakePayloadReceive = () => ({
  id: 'any_id',
  user: {
    id: 'any_id',
    name: 'any_name',
    username: 'any_username',
    password: 'any_password'
  },
  content: {
    message: 'any_message'
  }
});

const makeUserSendMessage = () => {
  const makeFakeMessagesRepository = new FakeMessagesRepository();
  const makedUseCase = new UserSendMessage(makeFakeMessagesRepository);

  return {
    makeFakeMessagesRepository,
    makedUseCase
  };
};

const makeSut = () => {
  const { makedUseCase, makeFakeMessagesRepository } = makeUserSendMessage();
  const sut = new UserSendMessageController(makedUseCase);

  return {
    sut,
    makedUseCase,
    makeFakeMessagesRepository
  };
};

describe('User Send Message Controller Tests', () => {
  test('should be calls correctly use case', async () => {
    const { sut, makedUseCase } = makeSut();
    const spyUseCase = jest.spyOn(makedUseCase, 'send');
    const makedFakePayloadReceive = makeFakePayloadReceive();
    await sut.handle(makedFakePayloadReceive);

    expect(spyUseCase).toHaveBeenCalledTimes(1);
    expect(spyUseCase).toHaveBeenCalledWith(makedFakePayloadReceive);
  });

  test('should be catch if use cases returns left in Either', async () => {
    const { sut, makeFakeMessagesRepository } = makeSut();
    jest.spyOn(makeFakeMessagesRepository, 'saveMessage').mockImplementationOnce(async () => {
      const response = left(new InfraError());
      return new Promise((resolve, reject) => reject(response));
    });
    const testable = await sut.handle(makeFakePayloadReceive());

    expect(testable.statusCode).toBe(500);
  });
});
