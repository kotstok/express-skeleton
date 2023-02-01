const HttpStatus = require('http-status-codes');
const { matchedData } = require('express-validator');

const Post = require('#models/post.model');
const AccessDeniedError = require('#app/errors/access-denied.error');

class PostController {
  async findPost(req, res) {
    const where = {};

    const pagination = matchedData(req, {
      includeOptionals: true,
      locations: [ 'query' ],
    });

    if (req.params.id) {
      where.id = req.params.id;
    } else {
      where.authorId = req.auth.id;
    }

    const posts = await Post.findAll({
      where: where,
      ...pagination,
    });

    res.json(posts);
  }

  async createPost(req, res) {
    const data = matchedData(req, {
      includeOptionals: false,
      locations: [ 'body' ],
    });

    data.authorId = req.auth.id;

    const post = await Post.create(data);

    res.status(HttpStatus.CREATED)
      .json(post.dataValues);
  }

  async deletePost(req, res, next) {
    const post = await Post.findOne({
      attributes: [ 'authorId' ],
      where: { id: req.params.id },
    });

    if (!post || post.authorId !== req.auth.id) {
      next(new AccessDeniedError('The post can be deleted only by the author'));
      return;
    }

    Post.destroy({
      where: { id: req.params.id },
    });

    res.status(HttpStatus.NO_CONTENT)
      .send();
  }

  async editPost(req, res, next) {
    const data = matchedData(req, {
      includeOptionals: true,
      locations: [ 'body' ],
    });

    const [ affectedCount ] = await Post.update(data, {
      where: {
        authorId: req.auth.id,
        id: req.params.id,
      },
    });

    if (0 === affectedCount) {
      next(new AccessDeniedError('The post can be edited only by the author'));
      return;
    }

    res.status(HttpStatus.NO_CONTENT)
      .send();
  }
}

module.exports = new PostController();
