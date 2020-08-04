import { Router } from 'express';
import BoardColumnController from '../controllers/boardColumn.controllers';

const router = Router();
const boardColumnController = new BoardColumnController();

router.get('/', boardColumnController.getAll);
router.get('/:id', boardColumnController.getOne);
router.put('/:id', boardColumnController.put);
router.delete('/:id', boardColumnController.delete);
router.post('/', boardColumnController.post);

export default router;
