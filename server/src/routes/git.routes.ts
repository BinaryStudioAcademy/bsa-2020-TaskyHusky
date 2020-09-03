import { Router } from 'express';
import GitController from '../controllers/git.controllers';

const router = Router();
const gitController = new GitController();

router.get('/:message', gitController.getCommits);

export default router;
