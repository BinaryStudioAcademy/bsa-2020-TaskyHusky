import { Router } from 'express';
import example from './example.routes';
import auth from './auth.routes';
import board from './board.routes';
import boardColumn from './boardColumn.routes'

const routes = Router();

routes.use('/example', example);
routes.use('/auth', auth);
routes.use('/boards', board);
routes.use('/boardColumns', boardColumn);

export default routes;
