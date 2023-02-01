const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const AppRouter = require('./routes/index');
const morganMiddleware = require('./middlewares/morgan.middleware');
const { errorHandler } = require('./middlewares/errors.middleware');

app.use(morganMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route handlers
app.use(AppRouter);
app.use(errorHandler);

module.exports = app;
