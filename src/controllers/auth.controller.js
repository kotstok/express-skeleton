const HttpStatus = require('http-status-codes');

const User = require('../../models/user.model');
const {
  UniqueConstraintError,
  ValidationError,
} = require('sequelize');

class AuthController {
  async signIn(req, res) {

    res.json({
      test: 1,
    });
  }

  async signUp(req, res, next) {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        passwd: req.body.passwd,
        updatedAt: null,
      });

      delete user.passwd;

      res.status(HttpStatus.CREATED).json(user);

    } catch (err) {
      next(err)
    }
  }
}

module.exports = new AuthController();
