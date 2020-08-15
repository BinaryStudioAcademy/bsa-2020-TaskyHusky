import { Router } from 'express';
import ResetPasswordController from '../controllers/resetPassword.controller';

const router = Router();
const controller=new ResetPasswordController();

router.post('/forgot-password', controller.forgotPassword)
router.post('/reset-password/:token', controller.resetPassword)

export default router
