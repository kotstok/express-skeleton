import { UserEditDto } from '../dto/user';
import { DI } from '../utils/database';
import { User } from '../entities/user.entity';
import { HashPasswd } from '../utils/passwd';
import UserExistError from '../errors/user-exist.error';

class UserService {
  async findUserById(user_id: number) {
    const repository = DI.orm.em.getRepository(User);

    return await repository.findOne(user_id, {
      fields: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async edit(user_id: number, dto: UserEditDto): Promise<boolean> {
    const repository = DI.orm.em.getRepository(User);

    // check if email is unique
    if (dto.email) {
      const accountByEmail = await repository.findOne(
        { email: dto.email },
        { fields: ['id'] },
      );

      if (accountByEmail && accountByEmail.id !== user_id) {
        throw new UserExistError('Email is already in use');
      }
    }

    if (dto.passwd) {
      dto.passwd = await HashPasswd(dto.passwd);
    }

    repository.nativeUpdate({ id: user_id }, dto);

    return true;
  }
}

export default new UserService();
