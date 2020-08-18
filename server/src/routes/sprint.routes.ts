import { Router } from 'express';
import SprintController from '../controllers/sprint.controllers';

const router = Router();
const {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
	getProjectById,
	getBoardById,
	getIssuesById,
} = new SprintController();

router
	.get('/', getAll)
	.get('/:id', getById)
	.post('/', create)
	.put('/:id', updateById)
	.delete('/:id', deleteById)
	.get('/:id/project', getProjectById)
	.get('/:id/board', getBoardById)
	.get('/:id/issues', getIssuesById);

export default router;
