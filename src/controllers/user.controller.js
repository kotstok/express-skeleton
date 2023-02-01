const { matchedData } = require('express-validator');
const HttpStatus = require('http-status-codes');

const User = require('#models/user.model');
const AccessDeniedError = require('#app/errors/access-denied.error');
const { HashPasswd } = require('#app/utils/passwd');

class UserController {
  async findMe(req, res) {
    const user = await User.findOne({
      where: req.auth,
    });

    delete user.dataValues.passwd;

    res.json(user);
  }

  async editUser(req, res, next) {
    // allow to edit only my user
    if (req.params.id && +req.params.id !== req.auth.id) {
      next(new AccessDeniedError('You don\'t have permissions to edit this user'));

      return;
    }

    const data = matchedData(req, {
      includeOptionals: true,
      locations: [ 'body' ],
    });

    if (data.passwd) {
      data.passwd = await HashPasswd(data.passwd);
    }

    User.update(data, { where: { id: req.auth.id } });

    res.status(HttpStatus.NO_CONTENT)
      .send();
  }
}

module.exports = new UserController();
