import { Router } from 'express';
import BoardController from '../controllers/board.controller';
// import ExampleController from '../controllers/example.controllers';

const router = Router();
const boardController = new BoardController();

router.get('/', boardController.getAll);
router.get('/:id', boardController.getOne);
router.get('/withColumn/:id', boardController.getOneWithColumn);
router.put('/:id', boardController.put);
router.delete('/:id', boardController.delete);
router.post('/', boardController.post);

export default router;
