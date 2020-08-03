import { Router } from 'express';
import AuthController from '../controllers/auth.controllers';
import logIn from '../middleware/login.middleware';
import register from '../middleware/register.middleware';

const router = Router();
const authController = new AuthController();

router.post('/login', logIn, authController.sendUser);
router.post('/register', register, authController.sendUser);

export default router;
