import { Router } from 'express';
import BoardController from '../controllers/board.controller';
import boardColumn from './boardColumn.routes';

const router = Router();
const boardController = new BoardController();

router.use('/column', boardColumn);
router.get('/', boardController.getAll);
router.get('/recent', boardController.getRecent);
router.get('/:id', boardController.getOne);
router.get('/:id/columns', boardController.getBoardColumns);
router.get('/:id/projects', boardController.getBoardProjects);
router.get('/:id/sprints', boardController.getBoardSprints);
router.put('/:id', boardController.put);
router.delete('/:id', boardController.delete);
router.post('/', boardController.post);

export default router;
