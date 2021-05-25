import chatEvents from '@main/events/chat-events';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MongoHelper } from '@external/mongodb/helpers';
import { MessagePack } from '@usecases/user-send-message';

const { createServer } = require('http');

const Client = require('socket.io-client');

describe('User Send Message Integration Tests', () => {
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

  test('functionality', (done) => {
    const testable: MessagePack = {
      id: 'any_message_id',
      user: {
        id: 'any_user_id',
        name: 'any_name',
        username: 'any_username',
        password: 'any_password'
      },
      content: {
        message: 'any_message_content'
      }
    };
    clientSocket.on('broadcast-user-send-message', (payload: any) => {
      expect(payload).toEqual({
        statusCode: 200,
        body: {
          id: 'any_message_id',
          sender: {
            id: 'any_user_id',
            name: 'any_name',
            username: 'any_username',
            password: 'any_password'
          },
          content: {
            message: 'any_message_content'
          }
        }
      });
      done();
    });
    clientSocket.emit('user-send-message', testable);
  });
});
