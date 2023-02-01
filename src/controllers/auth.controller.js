const HttpStatus = require('http-status-codes');
const { matchedData } = require('express-validator');

const { Signup, Auth } = require('#app/services/auth.service');

class AuthController {
  async signIn(req, res, next) {
    try {
      const [token, user] = await Auth(req.body.email, req.body.passwd);

      res.json({
        user: user,
        token: token,
      });
    } catch (e) {
      next(e);
    }
  }

  async signUp(req, res, next) {
    const data = matchedData(req, {
      includeOptionals: true,
      locations: [ 'body' ],
    });

    try {
      const user = await Signup(data);

      res.status(HttpStatus.CREATED)
        .json(user);

    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
