/* eslint-disable no-console */
import chatEvents from '@main/events/chat-events';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MongoHelper } from '@external/mongodb/helpers';

const { createServer } = require('http');

const Client = require('socket.io-client');

const insertFixtureInDataPersistence = async (messageToSave: any) => {
  const messagesCollection = await MongoHelper.getCollection('messages');
  return messagesCollection.insertOne(messageToSave);
};

describe('User Entry In Connection Integration Tests', () => {
  let io: { on: (arg0: string, arg1: (socket: any) => void) => void; close: () => void };
  let serverSocket: Socket<DefaultEventsMap, DefaultEventsMap>;
  let clientSocket: any;

  beforeAll(async (done) => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '');
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const { port } = httpServer.address();
      const HOST = `http://localhost:${port}`;
      clientSocket = new Client(HOST);
      io.on('connection', (socket: Socket) => {
        serverSocket = socket;
        chatEvents(serverSocket);
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
    MongoHelper.disconnect();
  });

  test('should receive saved messages in messages repository', async (done) => {
    await insertFixtureInDataPersistence({
      user: {
        id: 'any_id',
        name: 'any_name',
        username: 'any_username',
        password: 'any_password'
      },
      message: 'any_message'
    });

    clientSocket.emit('user-entry-in-connection', true);

    clientSocket.on('response-user-entry-in-connection', (payload: any) => {
      expect(payload).toEqual({
        statusCode: 200,
        body: {
          id: 'global_chat',
          messages: [
            {
              sender: { id: 'any_id', name: 'any_name', username: 'any_username', password: 'any_password' },
              content: { message: 'any_message' }
            }
          ]
        }
      });
      done();
    });
  });
});
