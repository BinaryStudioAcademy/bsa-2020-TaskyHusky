import { Router } from 'express';
import { IssueCommentController } from '../controllers/issueComment.controllers';

const router = Router();
const controller = new IssueCommentController();

router
	.get('/byIssue/:id', controller.getAllByIssueId)
	.get('/:id', controller.getOneById)
	.post('/', controller.createOne)
	.put('/:id', controller.updateOne)
	.delete('/:id', controller.deleteOne);

export default router;
