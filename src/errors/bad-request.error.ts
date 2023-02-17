import StatusCodes from 'http-status-codes';
import BaseError from './base.error';

class BadRequestError extends BaseError {
  constructor(
    description = 'Bad request',
    statusCode = StatusCodes.BAD_REQUEST,
    isOperational = true,
  ) {
    super('BadRequestError', statusCode, isOperational, description);
  }
}

export default BadRequestError;
