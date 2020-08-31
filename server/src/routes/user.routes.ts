import { Router } from 'express';
import UserController from '../controllers/user.controllers';
import teamMates from './teammates.routes';
import notifications from './notification.routes';
import { validateImage, uploadImage } from '../middleware/imageMiddleware';

const router = Router();
const userController = new UserController();

router.use('/', teamMates);
router.use('/notification', notifications);
router.get('/', userController.getAllUser);
router.get('/teammates', userController.getTeammates);
router.get('/:id', userController.getUser);
router.get('/projects/:id', userController.getProjects);
router.get('/teams/:id', userController.getTeams);
router.get('/issues/:id', userController.getIssues);
router.put('/', userController.updateUser);
router.put('/password', userController.changePassword);
router.put('/email/:token', userController.changeEmail);
router.delete('/', userController.deleteUser);
router.post('/avatar', uploadImage, validateImage, userController.uploadAvatar);
router.post('/reset-email', userController.sendResetEmail);

export default router;
