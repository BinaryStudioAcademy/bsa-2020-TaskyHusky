import { Router } from 'express';
import ProjectsController from '../controllers/projects.controllers';
import IssueController from '../controllers/issue.controllers';
import { validateImage, uploadImage } from '../middleware/imageMiddleware';

const router = Router();

const projectsController = new ProjectsController();
const issueController = new IssueController();

router.get('/', projectsController.getAllProjects);
router.get('/keys', projectsController.getAllKeys);
router.get('/:id', projectsController.getProject);
router.get('/:id/issues', issueController.getByProjectId);
router.post('/', projectsController.createProject);
router.post('/label', projectsController.createLabel);
router.post('/avatar/:id', uploadImage, validateImage, projectsController.uploadAvatar);
router.put('/', projectsController.updateProject);
router.put('/label', projectsController.updateLabel);
router.put('/users', projectsController.updateProjectUsersList);
router.delete('/', projectsController.deleteProject);
router.delete('/label', projectsController.deleteLabel);

export default router;
