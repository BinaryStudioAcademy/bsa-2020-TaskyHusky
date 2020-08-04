import { Router } from 'express';
import example from './example.routes';
import auth from './auth.routes';
import issueType from './issueType.routes';
import priority from './priority.routes';

const routes = Router();

routes.use('/example', example);
routes.use('/auth', auth);
routes.use('/issue_type', issueType);
routes.use('/priority', priority);

export default routes;
