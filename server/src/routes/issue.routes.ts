import { Router } from 'express';
import IssueController from '../controllers/issue.controllers';
import issueType from './issueType.routes';
import priority from './priority.routes';
import status from './issueStatus.routes';
import comment from './issueComment.routes';

const router = Router();
const controller = new IssueController();

router
	.use('/type', issueType)
	.use('/priority', priority)
	.use('/status', status)
	.use('/comment', comment)
	.get('/', controller.getAll)
	.post('/filtered', controller.getFilteredIssues)
	.get('/:id', controller.getById)
	.get('/byKey/:key', controller.getByKey)
	.post('/:id/watch', controller.watch)
	.post('/', controller.create)
	.put('/:id', controller.update)
	.put('/byKey/:key', controller.updateByKey)
	.delete('/:id', controller.delete);

export default router;
