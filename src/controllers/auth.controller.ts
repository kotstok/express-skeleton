import HttpStatus from 'http-status-codes';
import { matchedData } from 'express-validator';

import AuthService from '../services/auth.service';
import { Request, NextFunction, Response } from 'express';
import { UserSignUpDto } from '../dto/user';

class AuthController {
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const [token, user] = await AuthService.signIn(
        req.body.email,
        req.body.passwd,
      );

      res.json({
        user: user,
        token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    const data = <UserSignUpDto>matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    try {
      const user = await AuthService.signUp(data);

      res.status(HttpStatus.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
