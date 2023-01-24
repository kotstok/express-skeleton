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

const PORT = process.env.PORT || 3000;

(async function () {
  logger.info('Sync database...');

  await sequelize.sync({ force: IsTestEnv })
    .then(result => logger.info('The database has been successfully synchronized'))
    .catch(err => logger.error(err.message));

  app.listen(PORT, () => {
    logger.info(`API is listening on port ${PORT}`);
  });
})();
