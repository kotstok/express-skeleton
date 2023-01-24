class UserController {
  async findMe(req, res) {
    return 2;
  }

  async editUser(req, res) {
    return 1;
  }
}

module.exports = new UserController();
