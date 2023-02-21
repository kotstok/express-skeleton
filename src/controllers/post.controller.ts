import HttpStatus from 'http-status-codes';
import { matchedData } from 'express-validator';

import AccessDeniedError from '../errors/access-denied.error';
import { NextFunction, Response, AuthRequest } from 'express';
import PostService from '../services/post.service';
import PaginationDto from '../dto/pagination';
import { CreatePostDto, EditPostDto } from '../dto/posts';

class PostController {
  async findPost(req: AuthRequest, res: Response) {
    let posts;

    if (req.params.id) {
      posts = await PostService.findPost(+req.params.id, req.auth.id);
    } else {
      const pagination = <PaginationDto>matchedData(req, {
        includeOptionals: true,
        locations: ['query'],
      });

      posts = await PostService.findPostsByAuthor(req.auth.id, pagination);
    }

    res.json(posts ?? {});
  }

  async createPost(req: AuthRequest, res: Response) {
    const data = <CreatePostDto>matchedData(req, {
      includeOptionals: false,
      locations: ['body'],
    });

    const postId = await PostService.create(req.auth.id, data);

    res.status(HttpStatus.CREATED).json({
      post_id: postId,
    });
  }

  async deletePost(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await PostService.dropPost(+req.params.id, req.auth.id);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  }

  async editPost(req: AuthRequest, res: Response, next: NextFunction) {
    const data = <EditPostDto>matchedData(req, {
      includeOptionals: false,
      locations: ['body'],
    });

    try {
      await PostService.edit(+req.params.id, req.auth.id, data);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
