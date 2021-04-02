import { MongoHelper as sut } from './mongo-helper';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('messages');
    expect(accountCollection).toBeTruthy();

    await sut.disconnect();
    accountCollection = await sut.getCollection('messages');
    expect(accountCollection).toBeTruthy();
  });
});
