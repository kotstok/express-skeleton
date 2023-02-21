import { defineConfig } from '@mikro-orm/postgresql';
import { IsProdEnv } from './utils/environment';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const options = defineConfig({
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  host: process.env.DB_HOST,
  entities: ['./dist/src/entities'],
  entitiesTs: ['./src/entities'],
  allowGlobalContext: true,
  debug: !IsProdEnv,
  baseDir: process.cwd(),
  logger: (msg) => logger.debug(msg),
});

export default options;
