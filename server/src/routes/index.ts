import { Router } from 'express';
import example from './example.routes';
import filter from './filter.routes';

const routes = Router();

routes.use('/example', example);
routes.use('/filter', filter);

export default routes;
