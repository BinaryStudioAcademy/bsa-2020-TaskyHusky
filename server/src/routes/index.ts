import { Router } from 'express';
import example from './example.routes';
import filter from './filter.routes';
import filterDef from './filterDefinition.routes';
import filterPart from './filterPart.routes';

const routes = Router();

routes.use('/example', example);
routes.use('/filter', filter);
routes.use('/filterDef', filterDef);
routes.use('/filterPart', filterPart);

export default routes;
