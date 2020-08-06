import { Router } from 'express';
import ProjectsController from '../controllers/projects.controllers';

const router = Router();

const projectsController = new ProjectsController();

router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProject);
router.post('/', projectsController.createProject);
router.put('/', projectsController.updateProject);
router.delete('/', projectsController.deleteProject);

export default router;
