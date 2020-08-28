import { Router } from 'express';
import IssueController from '../controllers/issue.controllers';
import issueType from './issueType.routes';
import priority from './priority.routes';
import status from './issueStatus.routes';
import comment from './issueComment.routes';
import attachment from './issueAttachment.routes';

const router = Router();
const controller = new IssueController();

router
	.use('/type', issueType)
	.use('/priority', priority)
	.use('/status', status)
	.use('/comment', comment)
	.use('/attachment', attachment)
	.get('/', controller.getAll)
	.get('/:id', controller.getById)
	.get('/byKey/:key', controller.getByKey)
	.get('/:boardId/boardIssues', controller.getBacklogByBoardId)
	.post('/filtered', controller.getFilteredIssues)
	.post('/:id/watch', controller.watch)
	.post('/', controller.create)
	.put('/:id', controller.update)
	.put('/byKey/:key', controller.updateByKey)
	.delete('/:id', controller.delete);

export default router;
