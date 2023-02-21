import { matchedData } from 'express-validator';
import HttpStatus from 'http-status-codes';

import AccessDeniedError from '../errors/access-denied.error';
import { Response, NextFunction, AuthRequest } from 'express';
import UserService from '../services/user.service';
import { UserEditDto } from '../dto/user';

class UserController {
  async findMe(req: AuthRequest, res: Response) {
    const user = await UserService.findUserById(req.auth.id);

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

    const dto = <UserEditDto>matchedData(req, {
      includeOptionals: false,
      locations: ['body'],
    });

    try {
      await UserService.edit(req.auth.id, dto);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
