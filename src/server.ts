import app from './app';
import logger from './utils/logger';
import sequelize from './utils/database';
import { IsTestEnv } from './utils/environment';

const PORT = process.env.PORT || 3000;

logger.info('Sync database...');

sequelize
  .sync({ force: IsTestEnv })
  .then(() => {
    logger.info('The database has been successfully synchronized');

    app.listen(PORT, () => {
      logger.info(`API is listening on port ${PORT}`);
    });
  })
  .catch((err) => logger.error(err.message));
