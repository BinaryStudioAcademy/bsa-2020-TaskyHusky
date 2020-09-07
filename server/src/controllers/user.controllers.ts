import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { randomBytes } from 'crypto';
import { passwordValid, hashPassword } from '../helpers/password.helper';
import { UserRepository } from '../repositories/user.repository';
import uploadS3 from '../services/file.service';
import { avatarFolder } from '../../config/aws.config';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { UserProfile } from '../entity/UserProfile';
import { expirationTime } from '../constants/resetPassword.constants';
import { sendMailWithSes } from '../services/email.service';
import { resetEmailTemplate } from '../helpers/emailTemplates.helper';

class UserController {
	sendResetEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { email } = req.body;
		try {
			const user = <UserProfile>await userRepository.getByEmail(email);
			if (user) {
				throw new Error('User with such email already exist.');
			}

			const resetEmailToken = randomBytes(20).toString('hex');

			const resetEmailExpires = new Date(Date.now() + expirationTime);
			const savedUser = await userRepository.updateById(req.user.id, {
				resetEmailToken,
				resetEmailExpires,
			});

			await sendMailWithSes({
				to: [email],
				message: resetEmailTemplate(`${resetEmailToken}/${Buffer.from(email).toString('base64')}`),
				subject: 'Request to change email',
			});
			res.status(200).send(savedUser);
		} catch (error) {
			next(new ErrorResponse(400, error.message));
		}
	};

	uploadAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id, firstName, lastName } = <UserProfile>req.user;
		const timestamp = +new Date();
		const name = `${firstName}_${lastName}_${id}_${timestamp}`;
		try {
			const avatar = await uploadS3(avatarFolder, req.file, name);
			if (!avatar) {
				throw new Error('Could not update avatar');
			}
			const user = await userRepository.updateById(id, { avatar });
			res.send(user);
		} catch (error) {
			next(new ErrorResponse(400, error.message));
		}
	};

	getProjects = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;
		try {
			const projects = await userRepository.getProjects(id);
			res.send(projects);
		} catch (error) {
			res.status(404).send(error.message);
		}
	};

	getIssues = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;
		try {
			const assignedIssues = (await userRepository.getAssignedIssues(id)) ?? [];
			const watchingIssues = (await userRepository.getWatchingIssues(id)) ?? [];
			const recentActivity = [...assignedIssues, ...watchingIssues]
				.sort(({ updatedAt: firstDate = '' }, { updatedAt: secondDate = '' }) => {
					return Number(new Date(secondDate)) - Number(new Date(firstDate));
				})
				.slice(0, 10);
			res.send({ assignedIssues, recentActivity });
		} catch (error) {
			res.status(404).send(error.message);
		}
	};

	getTeams = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;
		try {
			const teams = await userRepository.getTeams(id);
			res.send(teams);
		} catch (error) {
			res.status(404).send(error.message);
		}
	};

	changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { oldPassword, password: newPassword } = req.body;
		const { email, id } = <UserProfile>req.user;
		const { password = '' } = <UserProfile>await userRepository.getByEmail(email);
		try {
			if (!passwordValid(oldPassword, password)) {
				throw new Error('Old password is incorrect');
			}
			const changedPassword = hashPassword(newPassword);
			userRepository.updateById(id, { password: changedPassword });
			res.send({ message: 'Password was changed' });
		} catch (error) {
			next(new ErrorResponse(404, error.message));
		}
	};

	changeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { email, password } = req.body;
		const { token } = req.params;
		const user = <UserProfile>await userRepository.getByEmailToken(token);
		if (!user) {
			throw new Error('Token is expired or invalid');
		}
		const { password: validPassword = '', id } = user;
		try {
			if (!passwordValid(password, validPassword)) {
				throw new Error('Password is incorrect');
			}
			const updatedUser = await userRepository.updateById(id, {
				email,
				resetEmailToken: null,
				resetEmailExpires: null,
			});
			res.send(updatedUser);
		} catch (error) {
			next(new ErrorResponse(400, error.message));
		}
	};

	getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;

		try {
			const user = await userRepository.getById(id);
			if (!user) {
				throw new Error('User was not found');
			}
			res.send(user);
		} catch (error) {
			next(new ErrorResponse(404, error.message));
		}
	};

	getAllUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);

		try {
			const users = await userRepository.findAll();
			res.send(users);
		} catch (error) {
			res.status(404).send(error.message);
		}
	};

	updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.user;
		if (req.body.email) {
			const checkUser = await userRepository.getByEmail(req.body.email);
			if (checkUser && checkUser.id !== id) {
				throw new Error('This email is already taken');
			}
		}
		if (req.body.password || req.body.email) {
			throw new Error('Forbidden to change password and email');
		}
		try {
			const updatedUser = await userRepository.updateById(id, req.body);
			res.status(200).send(updatedUser);
		} catch (error) {
			next(new ErrorResponse(400, error.message));
		}
	};

	deleteUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.user;

		try {
			await userRepository.deleteById(id);
			res.status(200).send({ message: 'User was deleted' });
		} catch (error) {
			res.status(400).send(error.message);
		}
	};

	getTeammates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id: userId } = req.user;

		try {
			const user = await userRepository.getUserTeammates(userId);
			res.status(200).send(user);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, error.message));
		}
	};
}

export default UserController;
