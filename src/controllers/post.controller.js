const HttpStatus = require('http-status-codes');

class PostController {
  async findPost(req, res) {
    res.json({});
  }

  async createPost(req, res) {
    res.status(HttpStatus.CREATED)
      .json({});
  }

  async deletePost(req, res) {
    res.status(HttpStatus.NO_CONTENT)
      .send();
  }

  async editPost(req, res) {
    res.json({});
  }
}

module.exports = new PostController();
