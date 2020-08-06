import { Router } from 'express';
import SprintController from '../controllers/sprint.controllers';

const router = Router();
const controller = new SprintController();

router
	.get('/', controller.getAll)
	.get(':id', controller.getById)
	.post('/', controller.create)
	.put('/:id', controller.update)
	.delete('/:id', controller.delete);

export default router;
