const {
  ValidationError,
  UniqueConstraintError,
} = require('sequelize');
const logger = require('#app/utils/logger');
const HttpStatus = require('http-status-codes');
const BaseError = require('#app/errors/base.error');

const errorHandler = (err, req, res, next) => {
  if (!err) {
    next(req, res, next);
    return;
  }

  if (err instanceof BaseError) {
    res.status(err.statusCode)
      .json({ message: err.message });

    return;
  }

  logger.error(err.message);

  if (err instanceof ValidationError) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({
        message: 'Validation errors',
        errors: err.errors.map(err => err.message),
      });

  } else if (err instanceof UniqueConstraintError) {
    res.status(HttpStatus.CONFLICT)
      .json({
        message: 'Unique constraint violation',
        errors: err.errors.map(err => err.message),
      });

  } else {
    // handle other errors
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Internal server error',
        errors: []
      });
  }
};

module.exports = {
  errorHandler,
};
