import { Router } from 'express';
import TeamsController from '../controllers/teams.controllers';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getTeams);
router.get('/:id', teamsController.getTeam);
// router.post('/', teamsController.createProject);
router.put('/', teamsController.updateTeam);
router.delete('/:id', teamsController.deleteTeam);

export default router;
