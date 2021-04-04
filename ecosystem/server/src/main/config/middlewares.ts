import { Express } from 'express';
import { cors } from '@main/middlewares';

export default (app: Express): void => {
  app.use(cors);
};
