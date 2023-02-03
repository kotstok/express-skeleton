import HttpStatus from 'http-status-codes';
import { matchedData } from 'express-validator';

import { Signup, Auth } from './auth.service';
import { Request, NextFunction, Response } from 'express';
import { SignUpData } from './dto/signup';

class AuthController {
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const [token, user] = await Auth(req.body.email, req.body.passwd);

      res.json({
        user: user,
        token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    const data = <SignUpData>matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    try {
      const user = await Signup(data);

      res.status(HttpStatus.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
