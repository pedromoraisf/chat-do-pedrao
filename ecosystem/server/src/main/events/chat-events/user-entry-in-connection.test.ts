import chatEvents from '@main/events/chat-events';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MongoHelper } from '@external/mongodb/helpers';

const { createServer } = require('http');

const Client = require('socket.io-client');

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

  test('functionality', (done) => {
    clientSocket.on('response-user-entry-in-connection', (payload: any) => {
      expect(payload.statusCode).toBe(200);
      expect(payload.body).toEqual({
        id: {
          id: 'global_chat'
        },
        messages: []
      });
      done();
    });
    clientSocket.emit('user-entry-in-connection', true);
  });
});
