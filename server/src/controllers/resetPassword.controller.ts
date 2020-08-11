import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserProfile } from '../entity/UserProfile';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';


class ResetPasswordController {
	forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { email } = req.body;

		try {
			const user = <UserProfile>await userRepository.getByEmail(email);
			if (!user) throw new Error('User with this email does not exist');

			const token = randomBytes(20).toString('hex');



		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}

	};
}
