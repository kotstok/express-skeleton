import { Router } from 'express';
import { param, body } from 'express-validator';

import UserController from '../controllers/user.controller';
import { validateJwt } from '../middlewares/jwt.middleware';
import ParamsValidator from '../middlewares/params-validator.middleware';

const router = Router();

router.get('/me', validateJwt, UserController.findMe);

router.patch(
  '/:id?',
  validateJwt,
  [
    param('id').optional().isInt().withMessage('User id should be a number'),

    body('name')
      .optional()
      .isLength({ min: 3 })
      .withMessage('the name must have minimum length of 3')
      .trim(),

    body('email')
      .optional()
      .isEmail()
      .withMessage('invalid email address')
      .normalizeEmail(),

    body('passwd')
      .optional()
      .isLength({
        min: 8,
        max: 68,
      })
      .withMessage('password should have min and max length between 8-68')
      .matches(/\d/)
      .withMessage('password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('password should have at least one special character'),
  ],
  ParamsValidator,
  UserController.editUser,
);

export default router;
