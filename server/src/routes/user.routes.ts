import { Router } from 'express';
import UserController from '../controllers/user.controllers';
import imageMiddleware from '../middleware/imageMiddleware';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAllUser);
router.get('/:id', userController.getUser);
router.get('/projects/:id', userController.getProjects);
router.put('/', userController.updateUser);
router.put('/password', userController.changePassword);
router.delete('/', userController.deleteUser);
router.post('/avatar', imageMiddleware, userController.uploadAvatar);

export default router;
