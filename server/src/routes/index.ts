import { Router } from 'express';
import filter from './filter.routes';
import auth from './auth.routes';
import projects from './projects.routes';
import board from './board.routes';
import user from './user.routes';
import issue from './issue.routes';
import sprint from './sprint.routes';

const routes = Router();

routes
	.use('/filter', filter)
	.use('/auth', auth)
	.use('/user', user)
	.use('/issue', issue)
	.use('/board', board)
	.use('/projects', projects)
	.use('/sprint', sprint);

export default routes;
