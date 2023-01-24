const { Router } = require('express');

const PostRoute = require('./post.route.js');
const AuthRoute = require('./auth.route.js');
const UserRoute = require('./user.route.js');

const AppRouter = Router();

AppRouter.use('/auth', AuthRoute);
AppRouter.use('/posts', PostRoute);
AppRouter.use('/users', UserRoute);

module.exports = AppRouter;
