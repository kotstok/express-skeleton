import argon from 'argon2';
import crypto from 'crypto';

const hashingConfig = {
  parallelism: 1,
  memoryCost: 64000, // 64 mb
  timeCost: 3, // number of iterations
};

export async function HashPasswd(passwd: string) {
  const salt = crypto.randomBytes(16);

  return argon.hash(passwd, {
    ...hashingConfig,
    salt,
  });
}

export async function VerifyPasswd(hash: string, passwd: string) {
  return argon.verify(hash, passwd, hashingConfig);
}
