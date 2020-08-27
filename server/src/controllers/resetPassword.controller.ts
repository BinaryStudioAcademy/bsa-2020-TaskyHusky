import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserProfile } from '../entity/UserProfile';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import { hashPassword } from '../helpers/password.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { expirationTime } from '../constants/resetPassword.constants';
import { sendToken } from '../services/email.service';

class ResetPasswordController {
	forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { email } = req.body;

		try {
			const user = <UserProfile>await userRepository.getByEmail(email);
			if (!user) throw new Error('User with this email does not exist');

			const resetPasswordToken = randomBytes(20).toString('hex');

			const resetPasswordExpires = new Date(Date.now() + expirationTime);

			if (!user.email) throw new Error('Can not update user with unknown email');

			const savedUser = await userRepository.updateById(user.id, {
				email: user.email,
				resetPasswordToken,
				resetPasswordExpires,
			});

			sendToken(user.email, resetPasswordToken);
			res.status(200).send(savedUser);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};

	resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { password } = req.body;
		const { token } = req.params;

		try {
			const user = <UserProfile>await userRepository.getByToken(token);

			if (!user) throw new Error('Token is expired or invalid');

			if (!user.email) throw new Error('Can not update user with unknown email');

			const savedUser = await userRepository.updateById(user.id, {
				email: user.email,
				password: hashPassword(password),
				resetPasswordToken: null,
				resetPasswordExpires: null,
			});

			res.status(200).send(savedUser);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};
}

export default ResetPasswordController;
