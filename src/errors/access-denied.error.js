const { FORBIDDEN } = require('http-status-codes');
const BaseError = require('./base.error');

class AccessDeniedError extends BaseError {
  constructor(
    description = 'Access denied',
    statusCode = FORBIDDEN,
    isOperational = true,
  ) {
    super('AccessDeniedError', statusCode, isOperational, description);
  }
}

module.exports = AccessDeniedError;
