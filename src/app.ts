import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';

import AppRouter from './routes';
import logger from './middlewares/morgan.middleware';
import { errorHandler } from './middlewares/errors.middleware';
import { RequestContext } from '@mikro-orm/core';
import { DbConnect } from './utils/database';

dotenv.config();

const app = express();

// compresses all the responses
app.use(compression());

// adding set of security middlewares
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export const init = async () => {
  const orm = await DbConnect();

  await orm.isConnected();

  app.use((req, res, next) => RequestContext.create(orm.em, next));

  app.use(logger);

  // route handlers
  app.use(AppRouter);

  app.use(errorHandler);
};

export default app;
