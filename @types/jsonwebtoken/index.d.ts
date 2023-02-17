import { JwtPayload } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface AuthPayload extends JwtPayload {
    id: number;
    email: string;
  }
}
