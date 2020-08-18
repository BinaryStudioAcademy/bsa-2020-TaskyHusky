import { Router } from 'express';
import UserController from '../controllers/user.controllers';
import teamMates from './teammates.routes';
import imageMiddleware from '../middleware/imageMiddleware';

const router = Router();
const userController = new UserController();

router.get('/all/', userController.getAllUser);
router.get('/:id', userController.getUser);
router.put('/', userController.updateUser);
router.put('/password', userController.changePassword);
router.delete('/', userController.deleteUser);
router.post('/avatar', imageMiddleware, userController.uploadAvatar);
router.use('/', teamMates);

export default router;
