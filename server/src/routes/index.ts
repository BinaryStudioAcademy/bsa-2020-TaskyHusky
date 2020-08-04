import { Router } from 'express';
import example from './example.routes';
import filter from './filter.routes';
import auth from './auth.routes';
import issue from './issue.routes';

const routes = Router();

routes
    .use('/example', example)
    .use('/filter', filter)
    .use('/auth', auth)
    .use('/issue', issue);

export default routes;
