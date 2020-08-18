import { Router } from 'express';
import IssueStatusController from '../controllers/issueStatus.controllers';

const router = Router();
const controller = new IssueStatusController();

router
	.get('/', controller.getAll)
	.get('/:id', controller.getById)
	.post('/', controller.create)
	.put('/:id', controller.update)
	.delete('/:id', controller.delete);

export default router;
