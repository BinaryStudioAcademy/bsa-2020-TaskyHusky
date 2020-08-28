import { Router } from 'express';
import { IssueAttachmentController } from '../controllers/issueAttachment.controller';
import { uploadIssueAttachment, validateIssueAttachment } from '../middleware/issueAttachmentMiddleware';

const router = Router();
const controller = new IssueAttachmentController();

router
	.get('/', controller.getAll)
	.get('/:id', controller.getById)
	.post('/', uploadIssueAttachment, validateIssueAttachment, controller.createOne)
	.put('/:id', controller.updateOne)
	.delete('/:id', controller.deleteOne);

export default router;
