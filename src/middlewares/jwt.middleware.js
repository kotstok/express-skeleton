const {
  StatusCodes,
  ReasonPhrases,
} = require('http-status-codes');
const { VerifyToken } = require('#app/utils/jwt');

async function validateJwt(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }

  const auth = await VerifyToken(req.headers.authorization);
  if (!auth) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }

  req.auth = auth;
  next();
}

module.exports = {
  validateJwt,
};
