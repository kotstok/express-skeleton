import StatusCodes from 'http-status-codes';
import BaseError from './base.error';

class AuthError extends BaseError {
  constructor(
    description = 'Unauthorized',
    statusCode = StatusCodes.UNAUTHORIZED,
    isOperational = true,
  ) {
    super('AuthError', statusCode, isOperational, description);
  }
}

export default AuthError;
