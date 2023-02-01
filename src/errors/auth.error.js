const { UNAUTHORIZED } = require('http-status-codes');
const BaseError = require('./base.error');

class AuthError extends BaseError {
  constructor(
    description = 'Unauthorized',
    statusCode = UNAUTHORIZED,
    isOperational = true,
  ) {
    super('AuthError', statusCode, isOperational, description);
  }
}

module.exports = AuthError;
