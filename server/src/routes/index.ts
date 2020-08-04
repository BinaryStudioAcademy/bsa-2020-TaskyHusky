import { Router } from 'express';
import example from './example.routes';
import filter from './filter.routes';
import auth from './auth.routes';
import user from './user.routes';
import issue from './issue.routes';

const routes = Router();

routes
    .use('/example', example)
    .use('/filter', filter)
    .use('/auth', auth)
    .use('/user', user)
    .use('/issue', issue);

export default routes;
