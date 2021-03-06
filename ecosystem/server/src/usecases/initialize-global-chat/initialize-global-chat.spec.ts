import { InitializeGlobalChat } from '@usecases/initialize-global-chat';
import { FakeMessagesRepository } from '@usecases/output-ports/repositories';
import { LoadMessagesError } from '@usecases/errors';
import { InfraError } from '@usecases/output-ports/errors';
import { left } from '@shared/either';

interface SutTypes {
  sut: InitializeGlobalChat;
  fakeMessagesRepository: FakeMessagesRepository;
}

const makeSut = (): SutTypes => {
  const fakeMessagesRepository = new FakeMessagesRepository();
  const sut = new InitializeGlobalChat(fakeMessagesRepository);

  return {
    sut,
    fakeMessagesRepository
  };
};

describe('Use Case Initializ Global Chat Tests', () => {
  test('should be call adapter method correctly', async () => {
    const { sut, fakeMessagesRepository } = makeSut();

    const spyAdapter = jest.spyOn(sut, 'adapterRepoMessagesInEntityMessages');
    await sut.init();

    const fakeMessages = await fakeMessagesRepository.retrievMessages();
    expect(spyAdapter).toHaveBeenCalledWith(fakeMessages.value);
  });

  test('should be trace error case in initialize chat', async () => {
    const { sut, fakeMessagesRepository } = makeSut();

    const spyRetrievMessages = jest.spyOn(fakeMessagesRepository, 'retrievMessages');
    spyRetrievMessages.mockImplementation(() => {
      const res = new InfraError();
      return new Promise((resolve) => resolve(left(res)));
    });

    const testable = await sut.init();

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new LoadMessagesError(new InfraError().message));
  });
});
