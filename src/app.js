const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const AppRouter = require('./routes/index');
const sequelize = require('./utils/database');
const logger = require('./utils/logger');
const morganMiddleware = require('./middlewares/morgan.middleware');
const { errorHandler } = require('./middlewares/errors.middleware');
const { IsTestEnv } = require('./utils/environment');

app.use(morganMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route handlers
app.use(AppRouter);
app.use(errorHandler);

module.exports = app;
