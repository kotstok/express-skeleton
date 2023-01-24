const Env = {
  test: 'test',
  dev: 'development',
  prod: 'production'
}

const AppEnv = process.env.NODE_ENV || Env.dev;
const IsTestEnv = AppEnv === Env.test;
const IsProdEnv = AppEnv === Env.prod;
const IsDevEnv = AppEnv === Env.dev;

module.exports = {
  Env,
  AppEnv,
  IsDevEnv,
  IsProdEnv,
  IsTestEnv,
}
