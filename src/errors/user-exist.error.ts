import StatusCodes from 'http-status-codes';
import BaseError from './base.error';

class UserExistError extends BaseError {
  constructor(
    description = 'User with these credentials already exists',
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY,
    isOperational = true,
  ) {
    super('UserExistError', statusCode, isOperational, description);
  }
}

export default UserExistError;
