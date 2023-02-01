const { Router } =  require('express');
const PostController = require('#app/controllers/post.controller');

const router = Router();

router.get('/:id?', PostController.findPost);

router.post('/', PostController.createPost);

router.delete('/:id', PostController.deletePost);

router.patch('/:id', PostController.editPost);

module.exports = router;
