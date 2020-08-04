import { Router } from 'express';
import example from './example.routes';
import auth from './auth.routes';
import issueType from './issueType.routes';

const routes = Router();

routes.use('/example', example);
routes.use('/auth', auth);
routes.use('/issue_type', issueType);

export default routes;
