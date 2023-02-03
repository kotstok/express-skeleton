declare module '*/morgan.middleware' {
  import { RequestHandler } from 'express';
  export default function morganMiddleware(): RequestHandler;
}
