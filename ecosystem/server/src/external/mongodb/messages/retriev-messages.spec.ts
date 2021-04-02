import { MessagesRepo } from '@external/mongodb/messages';
import { MongoHelper } from '@external/mongodb/helpers';
import { makeFakeSavedMessage } from '@usecases/output-ports/repositories';
import { InfraError } from '@usecases/output-ports/errors';

const makeSut = () => {
  const sut = new MessagesRepo();

  return {
    sut
  };
};

describe('retrievMessages Tests', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const { sut } = makeSut();
    const collection = await MongoHelper.getCollection(sut.COLLECTION_NAME);
    await collection.deleteMany({});
  });

  test('should be return infos according interface', async () => {
    const { sut } = makeSut();

    const makedFakeSavedMessage = makeFakeSavedMessage();
    const collection = await MongoHelper.getCollection(sut.COLLECTION_NAME);
    await collection.insertOne(makedFakeSavedMessage);

    const testable = await sut.retrievMessages();

    expect(testable.isRight()).toBeTruthy();
    expect(testable.value).toEqual([makedFakeSavedMessage]);
  });

  test('should be returns isLeft if infra error case', async () => {
    const { sut } = makeSut();

    jest.spyOn(MongoHelper, 'getCollection').mockImplementationOnce(async () => {
      const errorRes = new Error('any_external_error');
      return new Promise((resolve, reject) => reject(errorRes));
    });
    const testable = await sut.retrievMessages();

    expect(testable.isLeft()).toBeTruthy();
    expect(testable.value).toEqual(new InfraError());
  });
});
