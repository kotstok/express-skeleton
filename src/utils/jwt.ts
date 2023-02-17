import jwt, { AuthPayload } from 'jsonwebtoken';
import log from '../utils/logger';

const JwtAlgorithm = 'HS256';

export async function VerifyToken(bearer: string): Promise<AuthPayload | null> {
  const token = bearer.split(' ');
  if (!token[1]) {
    return null;
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token[1], process.env.JWT_SECRET, {
      algorithms: [JwtAlgorithm],
      complete: true,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    });
  } catch (err) {
    log.error(err);

    return null;
  }

  return <AuthPayload>{
    id: decoded.payload.id,
    email: decoded.payload.email,
  };
}

export async function SignToken(payload: AuthPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: JwtAlgorithm,
    expiresIn: process.env.JWT_TTL,
  });
}
