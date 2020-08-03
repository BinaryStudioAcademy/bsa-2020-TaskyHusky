import { Router } from 'express';
import example from './example.routes';
import auth from './auth.routes';

const routes = Router();

routes.use('/example', example);
routes.use('/auth', auth);

export default routes;
