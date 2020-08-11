import { Router } from 'express';
import ResetPasswordController from '../controllers/resetPassword.controller';

const router = Router();
const controller=new ResetPasswordController();

router.post('/forgot_password', controller.forgotPassword)
router.post('/reset_password/:token', controller.resetPassword)

export default router
