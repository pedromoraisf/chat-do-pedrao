import { UserEntryInConnectionController } from '@presentation/controllers/wss/user-entry-in-connection';
import { InitializeGlobalChat } from '@usecases/initialize-global-chat';
import { FakeMessagesRepository } from '@usecases/output-ports/repositories';
import { left } from '@shared/either';
import { InfraError } from '@usecases/output-ports/errors';

const makeInitializeGlobalChat = () => {
  const fakeMessagesRepository = new FakeMessagesRepository();
  return new InitializeGlobalChat(fakeMessagesRepository);
};

const makeSut = () => {
  const makedUseCase = makeInitializeGlobalChat();
  const sut = new UserEntryInConnectionController(makedUseCase);

  return { sut, makedUseCase };
};

describe('User Entry In Connection Controller Tests', () => {
  test('should be call use case correctly', async () => {
    const { sut, makedUseCase } = makeSut();
    const spyUseCase = jest.spyOn(makedUseCase, 'init');
    await sut.handle();
    expect(spyUseCase).toHaveBeenCalledTimes(1);
  });

  test('should be return ok request if already operations have been succeded', async () => {
    const { sut } = makeSut();
    const testable = await sut.handle();
    expect(testable?.statusCode).toBe(200);
  });

  test('should be return an error if left return has been encountred', async () => {
    const { sut, makedUseCase } = makeSut();
    jest.spyOn(makedUseCase, 'init').mockImplementationOnce(async () => {
      const response = left(new InfraError());
      return new Promise((resolve, reject) => reject(response));
    });
    const testable = await sut.handle();
    expect(testable?.statusCode).toBe(500);
  });
});
