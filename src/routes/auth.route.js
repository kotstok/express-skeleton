const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');

const router = Router();

router.post('/', AuthController.signIn);

router.post('/signup', AuthController.signUp);

module.exports = router;
