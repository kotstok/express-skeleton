const argon = require('argon2');
const crypto = require('crypto');

const hashingConfig = {
  parallelism: 1,
  memoryCost: 64000, // 64 mb
  timeCost: 3, // number of iterations
};

async function HashPasswd(passwd) {
  const salt = crypto.randomBytes(16);

  return argon.hash(passwd, {
    ...hashingConfig,
    salt,
  });
}

async function VerifyPasswd(hash, passwd) {
  return argon.verify(hash, passwd, hashingConfig);
}

module.exports = {
  HashPasswd,
  VerifyPasswd,
};
