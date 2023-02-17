import { matchedData } from 'express-validator';
import HttpStatus from 'http-status-codes';

import User from '../../models/user.model';
import AccessDeniedError from '../errors/access-denied.error';
import { HashPasswd } from '../utils/passwd';
import { Response, NextFunction, AuthRequest } from 'express';

class UserController {
  async findMe(req: AuthRequest, res: Response) {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      where: req.auth,
    });

    res.json(user ? user : {});
  }

  async editUser(req: AuthRequest, res: Response, next: NextFunction) {
    // allow to edit only my user
    if (req.params.id && +req.params.id !== req.auth.id) {
      next(
        new AccessDeniedError("You don't have permissions to edit this user"),
      );

      return;
    }

    const data = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    if (data.passwd) {
      data.passwd = await HashPasswd(data.passwd);
    }

    await User.update(data, { where: { id: req.auth.id } });

    res.status(HttpStatus.NO_CONTENT).send();
  }
}

export default new UserController();
