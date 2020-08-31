import { Router } from 'express';
import filter from './filter.routes';
import auth from './auth.routes';
import projects from './projects.routes';
import team from './teams.routes';
import board from './board.routes';
import user from './user.routes';
import issue from './issue.routes';
import sprint from './sprint.routes';
import git from './git.routes'
import error404Middleware from '../middleware/error404';
import { validateRequestMw } from '../middleware/request.validation.middleware';
import { Board } from '../requests/Board';
import { Issue } from '../requests/Issue';
import { Sprint } from '../requests/Sprint';
import { Team } from '../requests/Team';
import { UserProfile } from '../requests/User';
import { Project } from '../requests/Project';
import { Filter } from '../requests/Filter';

const routes = Router();

routes
	.use('/filter', validateRequestMw(Filter), filter)
	.use('/auth', validateRequestMw(UserProfile), auth)
	.use('/user', validateRequestMw(UserProfile), user)
	.use('/issue', validateRequestMw(Issue), issue)
	.use('/board', validateRequestMw(Board), board)
	.use('/projects', validateRequestMw(Project), projects)
	.use('/sprint', validateRequestMw(Sprint), sprint)
	.use('/team', validateRequestMw(Team), team)
	.use('/commits', git)
	.use(error404Middleware);

export default routes;
