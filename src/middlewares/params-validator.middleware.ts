import { validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';
import { Request, NextFunction, Response } from 'express';

async function ParamsValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
    return;
  }

  res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
    message: 'Unprocessable Entity',
    errors: errors.array(),
  });
}

export default ParamsValidator;
