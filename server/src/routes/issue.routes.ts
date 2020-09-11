import { Router } from 'express';
import IssueController from '../controllers/issue.controllers';
import issueType from './issueType.routes';
import priority from './priority.routes';
import status from './issueStatus.routes';
import comment from './issueComment.routes';
import { uploadIssueAttachment, validateIssueAttachment } from '../middleware/issueAttachmentMiddleware';

const router = Router();
const controller = new IssueController();

router
	.use('/type', issueType)
	.use('/priority', priority)
	.use('/status', status)
	.use('/comment', comment)
	.get('/', controller.getAll)
	.get('/:id', controller.getById)
	.get('/byKey/:key', controller.getByKey)
	.get('/:boardId/boardIssues', controller.getIssuesByBoardId)
	.post('/attachment', uploadIssueAttachment, validateIssueAttachment, controller.uploadAttachment)
	.post('/filtered', controller.getFilteredIssues)
	.post('/:id/watch', controller.watch)
	.post('/reindex/columns', controller.reindexColumns)
	.post('/', controller.create)
	.put('/:id', controller.update)
	.put('/byKey/:key', controller.updateByKey)
	.delete('/:id', controller.delete);

export default router;
