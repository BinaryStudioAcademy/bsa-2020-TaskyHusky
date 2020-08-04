import { Router } from 'express';
import PriorityController from '../controllers/priority.controllers';

const router = Router();
const controller = new PriorityController();

router
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);

export default router;
