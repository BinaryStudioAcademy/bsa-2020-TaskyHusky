import { Router } from 'express';
import BoardController from '../controllers/board.controller';
// import ExampleController from '../controllers/example.controllers';

const router = Router();
const boardController = new BoardController();

router.get('/', boardController.getAll);

export default router;
