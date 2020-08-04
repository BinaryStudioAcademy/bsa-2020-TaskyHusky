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
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export default router;
