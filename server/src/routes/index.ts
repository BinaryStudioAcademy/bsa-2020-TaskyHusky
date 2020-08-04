import { Router } from 'express';
import example from './example.routes';
import filter from './filter.routes';
import auth from './auth.routes';
import user from './user.routes';

const routes = Router();

routes.use('/example', example);
routes.use('/filter', filter);
routes.use('/auth', auth);
routes.use('/user', user);

export default routes;
