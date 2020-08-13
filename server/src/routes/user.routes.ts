import { Router } from 'express';
import UserController from '../controllers/user.controllers';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAllUser);
router.get('/:id', userController.getUser);
router.put('/', userController.updateUser);
router.post('/', userController.createUser);
router.delete('/', userController.deleteUser);

export default router;
