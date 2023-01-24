const {
  StatusCodes,
  ReasonPhrases,
} = require('http-status-codes');
const { verifyToken } = require('../utils/jwt');

async function validateJwt(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }

  const auth = await verifyToken(req.headers.authorization);
  if (!auth) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid token' });
  }

  req.auth = auth;
  next();
}

module.exports = {
  validateJwt,
};
