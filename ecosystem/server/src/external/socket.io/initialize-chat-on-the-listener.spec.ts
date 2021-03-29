/* eslint-disable @typescript-eslint/no-var-requires */
import { SocketIoEvents } from "@external/socket.io"
import { makeFakeGlobalChatWithThreeInitialMessages } from "@entities/chat"
import { Server, Socket } from "socket.io";
const { createServer } = require("http");
const Client = require("socket.io-client");

const makeSut = (socket: Socket) => {
  const sut = new SocketIoEvents(socket);

  return {
    sut
  }
}

describe("initializeChatOnTheListener Tests", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const PORT = httpServer.address().port;
      const HOST = `http://localhost:${PORT}`;
      clientSocket = new Client(HOST);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should be send complete chat to connected client", (done) => {
    const { sut } = makeSut(serverSocket);

    const { chat } = makeFakeGlobalChatWithThreeInitialMessages();
    sut.initializeChatOnTheListener(chat)

    clientSocket.on("initialize-chat", payload => {
      expect(payload).toEqual(chat);
      done();
    });
  });

});
