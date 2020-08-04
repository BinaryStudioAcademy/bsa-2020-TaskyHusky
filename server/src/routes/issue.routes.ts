import { Router } from 'express';
import IssueController from '../controllers/issue.controllers';

const router = Router();
const controller = new IssueController();

router
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export default router;
