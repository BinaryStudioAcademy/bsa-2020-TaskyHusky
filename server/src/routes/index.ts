import { Router } from 'express';
import example from './example.routes';
import auth from './auth.routes';
import issueType from './issueType.routes';
import priority from './priority.routes';

const routes = Router();

routes
    .use('/example', example)
    .use('/auth', auth)
    .use('/issueType', issueType)
    .use('/priority', priority);

export default routes;
