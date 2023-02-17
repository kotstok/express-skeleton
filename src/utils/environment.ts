export const Env = {
  test: 'test',
  dev: 'development',
  prod: 'production',
};

export const AppEnv = process.env.NODE_ENV || Env.dev;
export const IsTestEnv = AppEnv === Env.test;
export const IsProdEnv = AppEnv === Env.prod;
export const IsDevEnv = AppEnv === Env.dev;
