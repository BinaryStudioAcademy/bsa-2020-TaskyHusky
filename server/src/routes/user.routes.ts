import { Router } from 'express';
import UserController from '../controllers/user.controllers';
import teamMates from './teammates.routes';
import { validateImage, uploadImage } from '../middleware/imageMiddleware';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAllUser);
router.get('/:id', userController.getUser);
router.get('/projects/:id', userController.getProjects);
router.get('/teams/:id', userController.getTeams);
router.put('/', userController.updateUser);
router.put('/password', userController.changePassword);
router.delete('/', userController.deleteUser);
router.post('/avatar', uploadImage, validateImage, userController.uploadAvatar);
router.use('/', teamMates);

export default router;
