import HttpStatus from 'http-status-codes';
import { matchedData } from 'express-validator';

import Post from '../../models/post.model';
import AccessDeniedError from '../errors/access-denied.error';
import { NextFunction, Response, AuthRequest } from 'express';

class PostController {
  async findPost(req: AuthRequest, res: Response) {
    const where: any = {};

    const pagination = matchedData(req, {
      includeOptionals: true,
      locations: ['query'],
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

  async createPost(req: AuthRequest, res: Response) {
    const data = matchedData(req, {
      includeOptionals: false,
      locations: ['body'],
    });

    data.authorId = req.auth.id;

    const post = await Post.create(data);

    res.status(HttpStatus.CREATED).json(post.dataValues);
  }

  async deletePost(req: AuthRequest, res: Response, next: NextFunction) {
    const post = await Post.findOne({
      attributes: ['authorId'],
      where: { id: req.params.id },
    });

    if (!post || post.authorId !== req.auth.id) {
      next(new AccessDeniedError('The post can be deleted only by the author'));
      return;
    }

    await Post.destroy({
      where: { id: req.params.id },
    });

    res.status(HttpStatus.NO_CONTENT).send();
  }

  async editPost(req: AuthRequest, res: Response, next: NextFunction) {
    const data = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    const [affectedCount] = await Post.update(data, {
      where: {
        authorId: req.auth.id,
        id: req.params.id,
      },
    });

    if (0 === affectedCount) {
      next(new AccessDeniedError('The post can be edited only by the author'));
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }
}

export default new PostController();
