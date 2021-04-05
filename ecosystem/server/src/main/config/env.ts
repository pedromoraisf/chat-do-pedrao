export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/chat-do-pedrao',
  port: process.env.PORT ?? 5050
};
