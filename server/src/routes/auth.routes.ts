import { Router } from 'express';
import passport from '../../config/passport.config';
import AuthController from '../controllers/auth.controllers';

const router = Router();
const authController = new AuthController();

router.post('/login', passport.authenticate('local'), authController.sendSuccessMessage);

export default router;
