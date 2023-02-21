import app, { init } from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

logger.info('Sync database...');

init()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`API is listening on port ${PORT}`);
    });
  })
  .catch((err) => logger.error(err.message));
