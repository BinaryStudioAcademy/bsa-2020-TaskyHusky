import { Router } from 'express';
import TeamsController from '../controllers/teams.controllers';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getTeams);
router.get('/:id', teamsController.getTeam);
router.get('/users/:id', teamsController.getTeamUsers);
router.get('/projects/:id', teamsController.getTeamProjects);
router.post('/', teamsController.createTeam);
router.put('/:id', teamsController.updateTeam);
router.post('/connect-to-team', teamsController.addUsersToTeam);
router.put('/fields/:id', teamsController.updateTeamsFields);
router.delete('/fields/:id', teamsController.deleteTeamsFields);
router.delete('/:id', teamsController.deleteTeam);

export default router;
