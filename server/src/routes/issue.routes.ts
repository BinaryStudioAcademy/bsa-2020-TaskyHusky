import { Router } from 'express';
import IssueController from '../controllers/issue.controllers';
import issueType from './issueType.routes';
import priority from './priority.routes';

const router = Router();
const controller = new IssueController();

router
	.use('/type', issueType)
	.use('/priority', priority)
	.get('/', controller.getAll)
	.get('/:id', controller.getById)
	.get('/byKey/:key', controller.getByKey)
	.post('/', controller.create)
	.put('/:id', controller.update)
	.put('/byKey/:id', controller.updateByKey)
	.delete('/:id', controller.delete);

export default router;
