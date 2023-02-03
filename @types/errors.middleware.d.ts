declare module '*/errors.middleware' {
  import { RequestHandler } from 'express';
  export const errorHandler: RequestHandler;
}
