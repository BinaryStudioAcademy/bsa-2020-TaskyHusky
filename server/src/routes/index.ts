import { Router } from 'express';
import example from './example.routes';
import filter from './filter.routes';
import filterDef from './filterDefinition.routes';
import filterPart from './filterPart.routes';
import auth from './auth.routes';

const routes = Router();

routes.use('/example', example);
routes.use('/filter', filter);
routes.use('/filterDef', filterDef);
routes.use('/filterPart', filterPart);
routes.use('/auth', auth);

export default routes;
