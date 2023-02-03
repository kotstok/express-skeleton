import morgan from 'morgan';
import logger from '../utils/logger';
import { IsDevEnv } from '../utils/environment';

const stream = {
  // Use the http severity
  write: (message: string) => logger.http(message),
};

const skip = (): boolean => !IsDevEnv;

//:remote-addr :method :url :status :res[content-length] - :response-time ms
const morganMiddleware = morgan(
  function (tokens, req, res) {
    return [
      tokens['remote-addr'](req, res),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  },
  {
    stream: stream,
    skip,
  },
);

export default morganMiddleware;
