require('module-alias/register');

const app = require('#app/app');
const logger = require('#app/utils/logger');
const sequelize = require('#app/utils/database');
const { IsTestEnv } = require('#app/utils/environment');
const PORT = process.env.PORT || 3000;

(async function () {
  logger.info('Sync database...');

  await sequelize.sync({ force: IsTestEnv })
    .then(() => logger.info('The database has been successfully synchronized'))
    .catch(err => logger.error(err.message));

  app.listen(PORT, () => {
    logger.info(`API is listening on port ${PORT}`);
  });
})();
