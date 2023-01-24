const {
  ValidationError,
  UniqueConstraintError
} = require('sequelize');
const HttpStatus = require('http-status-codes');

const errorHandler = (err, req, res, next) => {

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
