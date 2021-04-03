import { PayloadReturn } from '@presentation/controllers/wss/protocols';

export const badRequest = (error: Error): PayloadReturn => ({
  statusCode: 400,
  body: error.message
});

export const serverError = (error: Error): PayloadReturn => ({
  statusCode: 500,
  body: error.message
});

export const ok = (data: any): PayloadReturn => ({
  statusCode: 200,
  body: data
});
