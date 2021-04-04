import express from 'express';
import setupMiddlewares from '@main/config/middlewares';
import setupWebSocket from '@main/config/web-socket';

const app = express();
setupMiddlewares(app);
setupWebSocket(app);

export default app;
