import { Router } from 'express';
import ProjectsController from '../controllers/projects.controllers';
import IssueController from '../controllers/issue.controllers';

const router = Router();

const projectsController = new ProjectsController();
const issueController = new IssueController();

router.get('/', projectsController.getAllProjects);
router.get('/keys', projectsController.getAllKeys);
router.get('/:id', projectsController.getProject);
router.get('/:id/issues', issueController.getByProjectId);
router.post('/', projectsController.createProject);
router.post('/label', projectsController.createLabel);
router.put('/', projectsController.updateProject);
router.put('/users', projectsController.updateProjectUsersList);
router.put('/label', projectsController.updateLabel);
router.delete('/', projectsController.deleteProject);
router.delete('/label', projectsController.deleteLabel);

export default router;
