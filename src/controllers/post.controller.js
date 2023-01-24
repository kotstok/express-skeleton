class PostController {
  async findPost(req, res) {
    return 1;
  }

  async createPost(req, res) {
    return 2;
  }

  async deletePost(req, res) {
    return 3;
  }

  async editPost(req, res) {
    return 4;
  }
}

module.exports = new PostController();
