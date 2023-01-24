const jwt = require('jsonwebtoken');
const log = require('../utils/logger');

async function verifyToken(bearer) {
  const [ , token ] = bearer.split(' ');
  let decoded = null;

  if (token) {
    try {
      decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      log.info(e.message);
    }
  }

  return decoded;
}

async function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TTL,
  });
}

module.exports = {
  verifyToken,
  signToken,
};
