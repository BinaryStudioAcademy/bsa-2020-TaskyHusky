import { Router } from 'express';
import AuthController from '../controllers/auth.controllers';
import logIn from '../middleware/login.middleware';
import register from '../middleware/register.middleware';
import checkEmail from '../middleware/checkEmail.middleware.';
import passport from '../../config/passport.config';

const router = Router();
const authController = new AuthController();

router
	.post('/login', logIn, authController.sendUser)
	.post('/register', register, authController.sendUser)
	.get('/profile', authController.sendExistingProfile)
	.post('/check_email', checkEmail, authController.checkEmail)
//	.get('/logout', (req:any, res:any) => req.session = null)
	.get('/google', () => {
		passport.authenticate('google', { scope: ['profile', 'email'] })
	})
	.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => res.redirect('/'))

export default router;
