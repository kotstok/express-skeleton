import User from '../../models/user.model';
import BadRequest from '../errors/bad-request.error';
import { SignToken } from '../utils/jwt';
import { HashPasswd, VerifyPasswd } from '../utils/passwd';
import { SignUpData } from './dto/signup';

export async function Signup(data: SignUpData) {
  const passwdHash = await HashPasswd(data.passwd);

  const user = await User.create({
    name: data.name,
    email: data.email,
    passwd: passwdHash,
  });

  delete user.dataValues.passwd;

  return user.dataValues;
}

export async function Auth(email: string, passwd: string) {
  const user = await User.findOne({
    attributes: ['id', 'passwd', 'email', 'name'],
    where: { email: email },
  });

  if (!user) {
    throw new BadRequest('Incorrect passwd or user does not exist');
  }

  const isValidPasswd = await VerifyPasswd(user.passwd, passwd);
  if (!isValidPasswd) {
    throw new BadRequest('Incorrect passwd or user does not exist');
  }

  delete user.dataValues.passwd;

  const token = await SignToken({
    id: user.id,
    email: user.email,
  });

  return [token, user];
}
