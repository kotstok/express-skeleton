import StatusCodes from 'http-status-codes';
import BaseError from './base.error';

class AccessDeniedError extends BaseError {
  constructor(
    description = 'Access denied',
    statusCode = StatusCodes.FORBIDDEN,
    isOperational = true,
  ) {
    super('AccessDeniedError', statusCode, isOperational, description);
  }
}

export default AccessDeniedError;
