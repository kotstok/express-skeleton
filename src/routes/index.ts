import { Router } from 'express';

import PostRoute from './post.route';
import AuthRoute from './auth.route';
import UserRoute from './user.route';

const AppRouter = Router();

AppRouter.use('/auth', AuthRoute);
AppRouter.use('/posts', PostRoute);
AppRouter.use('/users', UserRoute);

export default AppRouter;
