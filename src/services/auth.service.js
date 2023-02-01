const crypto = require('crypto');
const argon = require('argon2');

const User = require('#models/user.model');
const BadRequest = require('#app/errors/bad-request.error');
const { SignToken } = require('#app/utils/jwt');
const { HashPasswd,
  VerifyPasswd
} = require('../utils/passwd');

async function Signup(data) {
  const passwdHash = await HashPasswd(data.passwd);

  const user = await User.create({
    name: data.name,
    email: data.email,
    passwd: passwdHash,
  });

  delete user.dataValues.passwd;

  return user.dataValues;
}

async function Auth(email, passwd) {
  const user = await User.findOne({
    attributes: [ 'id', 'passwd', 'email', 'name' ],
    where: { email: email },
  });

  if (!user) {
    throw new BadRequest('Incorrect passwd or user does not exist')
  }

  const isValidPasswd = await VerifyPasswd(user.passwd, passwd);
  if (!isValidPasswd) {
    throw new BadRequest('Incorrect passwd or user does not exist')
  }

  delete user.dataValues.passwd;

  const token = await SignToken({
    id: user.id,
    email: user.email,
  });

  return [token, user];
}

module.exports = {
  Signup,
  Auth
};
