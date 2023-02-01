const { Router } = require('express');
const {
  param,
  body,
  query
} = require('express-validator');

const PostController = require('#app/controllers/post.controller');
const ParamsValidator = require('#app/middlewares/params-validator.middleware');
const { validateJwt } = require('#app/middlewares/jwt.middleware');

const router = Router();

router.get('/:id?', validateJwt, [
  param('id')
    .optional()
    .isInt()
    .withMessage('Post id should be a number'),

  query('offset')
    .optional()
    .isInt()
    .withMessage('Offset should be a number'),

  query('limit')
    .optional()
    .isInt()
    .withMessage('Limit should be a number'),
], ParamsValidator, PostController.findPost);

router.post('/', validateJwt, [
  body('title')
    .isLength({
      min: 3,
      max: 120,
    }),
  body('body')
    .isString(),
  body('published')
    .isBoolean(),
], ParamsValidator, PostController.createPost);

router.delete('/:id', validateJwt, [
  param('id')
    .isInt()
    .withMessage('Post id should be a number'),
], ParamsValidator, PostController.deletePost);

router.patch('/:id', validateJwt, [
  body('title')
    .optional()
    .isLength({
      min: 3,
      max: 120,
    }),
  body('body')
    .optional()
    .isString(),
  body('published')
    .optional()
    .isBoolean(),
], ParamsValidator, PostController.editPost);

module.exports = router;
