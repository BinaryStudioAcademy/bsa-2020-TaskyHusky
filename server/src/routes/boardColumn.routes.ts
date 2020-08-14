import { Router } from 'express';
import BoardColumnController from '../controllers/boardColumn.controllers';
import IssueController from '../controllers/issue.controllers';

const router = Router();
const boardColumnController = new BoardColumnController();
const issueController = new IssueController();

router.get('/', boardColumnController.getAll);
router.get('/:id', boardColumnController.getOne);
router.get('/:id/issues', issueController.getByColumnId);
router.put('/:id', boardColumnController.put);
router.delete('/:id', boardColumnController.delete);
router.post('/', boardColumnController.post);

export default router;
