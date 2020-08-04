import { Router } from 'express';
import IssueTypeController from '../controllers/issueType.controllers';

const router = Router();
const controller = new IssueTypeController();

router
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export default router;
