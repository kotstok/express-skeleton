const { validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

module.exports = async function (req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
    return;
  }

  res.status(HttpStatus.UNPROCESSABLE_ENTITY)
    .json({
      message: 'Unprocessable Entity',
      errors: errors.array(),
    });
};
