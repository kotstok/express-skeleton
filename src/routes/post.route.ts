import { Router } from 'express';
import { param, body, query } from 'express-validator';

import PostController from '../controllers/post.controller';
import ParamsValidator from '../middlewares/params-validator.middleware';
import { validateJwt } from '../middlewares/jwt.middleware';

const router = Router();

router.get(
  '/:id?',
  validateJwt,
  [
    param('id').optional().isInt().withMessage('Post id should be a number'),

    query('offset').optional().isInt().withMessage('Offset should be a number'),

    query('limit')
      .optional()
      .default(24)
      .isInt()
      .withMessage('Limit should be a number'),
  ],
  ParamsValidator,
  PostController.findPost,
);

router.post(
  '/',
  validateJwt,
  [
    body('title').isLength({
      min: 3,
      max: 120,
    }),
    body('body').isString(),
    body('published').isBoolean(),
  ],
  ParamsValidator,
  PostController.createPost,
);

router.delete(
  '/:id',
  validateJwt,
  [param('id').isInt().withMessage('Post id should be a number')],
  ParamsValidator,
  PostController.deletePost,
);

router.patch(
  '/:id',
  validateJwt,
  [
    body('title').optional().isLength({
      min: 3,
      max: 120,
    }),
    body('body').optional().isString(),
    body('published').optional().isBoolean(),
  ],
  ParamsValidator,
  PostController.editPost,
);

export default router;
