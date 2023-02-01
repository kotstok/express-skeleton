const { Router } = require('express');
const { body } = require('express-validator');

const AuthController = require('#app/controllers/auth.controller');
const ParamsValidator = require('#app/middlewares/params-validator.middleware')

const router = Router();

router.post('/', [
  body('email')
    .isEmail()
    .withMessage('invalid email address')
    .normalizeEmail(),

  body('passwd')
    .isString()
    .withMessage('password should be a string'),

], ParamsValidator, AuthController.signIn);

router.post('/signup', [
  body('name')
    .isLength({ min: 3 })
    .withMessage('the name must have minimum length of 3')
    .trim(),

  body('email')
    .isEmail()
    .withMessage('invalid email address')
    .normalizeEmail(),

  body('passwd')
    .isLength({
      min: 8,
      max: 68,
    })
    .withMessage('password should have min and max length between 8-68')
    .matches(/\d/)
    .withMessage('password should have at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('password should have at least one special character'),

], ParamsValidator, AuthController.signUp);

module.exports = router;
