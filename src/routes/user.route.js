const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { validateJwt } = require('../middlewares/jwt.middleware');

const router = Router();

router.get('/me', validateJwt, UserController.findMe);

router.get('/edit', validateJwt, UserController.editUser);

module.exports = router;
