import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { VerifyToken } from '../utils/jwt';
import { NextFunction, Response, Request } from 'express';

export async function validateJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });

    return;
  }

  const auth = await VerifyToken(req.headers.authorization);
  if (!auth) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });

    return;
  }

  req.auth = auth;

  next();
}
