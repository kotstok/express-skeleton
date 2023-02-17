import { AuthPayload } from 'jsonwebtoken';
import { Request } from 'express';

declare module 'express' {
  export interface AuthRequest extends Request {
    auth: AuthPayload;
  }
}

declare global {
  namespace Express {
    interface Request {
      auth: AuthPayload;
    }
  }
}
