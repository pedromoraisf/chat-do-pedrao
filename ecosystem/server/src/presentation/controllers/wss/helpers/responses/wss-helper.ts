import { PayloadReturn } from '@presentation/controllers/wss/protocols';
import { ServerError } from '@presentation/errors';

export const badRequest = (error: Error): PayloadReturn => ({
  statusCode: 400,
  body: error.message
});

export const serverError = (error: Error): PayloadReturn => ({
  statusCode: 500,
  body: new ServerError(error.stack).message
});

export const ok = (data: any): PayloadReturn => ({
  statusCode: 200,
  body: data.value
});
