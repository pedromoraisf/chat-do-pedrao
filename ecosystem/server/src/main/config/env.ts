import dotenv from 'dotenv';

dotenv.config();

export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/chat',
  port: process.env.PORT ?? 5050
};
