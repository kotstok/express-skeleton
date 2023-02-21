declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;

    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    SERVER_HOSTNAME: string;
    RATE_LIMIT_REQUEST: string;
    POSTGRES_VERSION: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_PASSWORD: string;
    DB_USERNAME: string;
    DB_NAME: string;
    JWT_SECRET: string;
    JWT_TTL: string;
  }
}
