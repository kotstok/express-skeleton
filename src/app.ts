import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

import AppRouter from './router';
import logger from './middlewares/morgan.middleware';
import { errorHandler } from './middlewares/errors.middleware';

dotenv.config();

const app = express();

// compresses all the responses
app.use(compression());

// adding set of security middlewares
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

// route handlers
app.use(AppRouter);

app.use(errorHandler);

export default app;
