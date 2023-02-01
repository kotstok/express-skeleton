const jwt = require('async-jsonwebtoken');
const log = require('../utils/logger');

async function VerifyToken(bearer) {
  const [ , token ] = bearer.split(' ');

  const [decoded, err] = await jwt.verify(token, process.env.JWT_SECRET);
  if (err) {
    log.info(err);

    return null;
  }

  delete decoded.iat;
  delete decoded.exp;

  return decoded;
}

async function SignToken(payload) {
  const [token, err] = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TTL,
  });

  if (err) {
    log.info(err);

    return null;
  }

  return token;
}

module.exports = {
  VerifyToken,
  SignToken,
};
