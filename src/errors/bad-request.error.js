const { BAD_REQUEST } = require('http-status-codes');
const BaseError = require('./base.error');

class BadRequestError extends BaseError {
  constructor(
    description = 'Bad request',
    statusCode = BAD_REQUEST,
    isOperational = true,
  ) {
    super('BadRequestError', statusCode, isOperational, description);
  }
}

module.exports = BadRequestError;
