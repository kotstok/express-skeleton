import { User } from '../entities/user.entity';
import BadRequest from '../errors/bad-request.error';
import { SignToken } from '../utils/jwt';
import { HashPasswd, VerifyPasswd } from '../utils/passwd';
import { UserSignUpDto } from '../dto/user';
import { DI } from '../utils/database';
import UserExistError from '../errors/user-exist.error';

class AuthService {
  async signUp(dto: UserSignUpDto) {
    const repository = DI.orm.em.getRepository(User);

    const userExist = await repository.findOne(
      { email: dto.email },
      { fields: ['id'] },
    );

    if (userExist) {
      throw new UserExistError();
    }

    const passwdHash = await HashPasswd(dto.passwd);

    const user = repository.create({
      name: dto.name,
      email: dto.email,
      isActive: true,
      passwd: passwdHash,
    });

    await repository.persistAndFlush(user);

    return user;
  }

  async signIn(email: string, passwd: string) {
    const repository = DI.orm.em.getRepository(User);

    const user = await repository.findOne(
      { email: email },
      {
        fields: ['id', 'passwd', 'email', 'name'],
      },
    );

    if (!user) {
      throw new BadRequest('Incorrect passwd or user does not exist');
    }

    const isValidPasswd = await VerifyPasswd(user.passwd, passwd);
    if (!isValidPasswd) {
      throw new BadRequest('Incorrect passwd or user does not exist');
    }

    const token = await SignToken({
      id: user.id,
      email: user.email,
    });

    return [token, user];
  }
}

export default new AuthService();
