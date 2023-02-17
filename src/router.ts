import { Router } from 'express';

import PostRoute from './posts/post.route';
import AuthRoute from './auth/auth.route';
import UserRoute from './users/user.route';

const AppRouter = Router();

AppRouter.use('/auth', AuthRoute);
AppRouter.use('/posts', PostRoute);
AppRouter.use('/users', UserRoute);

export default AppRouter;
