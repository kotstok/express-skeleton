import {
  ValidationError,
  UniqueConstraintError,
} from 'sequelize';
import logger from '../utils/logger';
import HttpStatus from 'http-status-codes';
import BaseError from '../errors/base.error';
import { AuthRequest, NextFunction, Response } from 'express';

type HttpErrorResponse = {
  message: string,
  errors: string[],
}

export async function errorHandler(err: Error | BaseError, req: AuthRequest, res: Response, next: NextFunction) {
  const response: HttpErrorResponse = {
    message: 'Internal server error',
    errors: [],
  };

  if (err instanceof BaseError) {
    res.status(err.statusCode)
    response.message = err.message;

  } else if (err instanceof ValidationError) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);

    response.message = 'Validation error';
    response.errors = err.errors.map(err => err.message);

  } else if (err instanceof UniqueConstraintError) {
    res.status(HttpStatus.CONFLICT);
    response.message = 'Unique constraint violation';
    response.errors = err.errors.map(err => err.message);

  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
  }

  logger.error(err.message + '. ' + response.errors.join(', '));

  res.json(response);
}
