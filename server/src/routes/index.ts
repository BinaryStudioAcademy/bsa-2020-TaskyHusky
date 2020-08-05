import { Router } from 'express';
import example from './example.routes';
import auth from './auth.routes';
import projects from './projects.routes';

const routes = Router();

routes.use('/example', example);
routes.use('/auth', auth);
routes.use('/projects', projects);

export default routes;
