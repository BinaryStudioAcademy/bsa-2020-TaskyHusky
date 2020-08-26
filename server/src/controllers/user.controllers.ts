import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { passwordValid, hashPassword } from '../helpers/password.helper';
import { UserRepository } from '../repositories/user.repository';
import uploadS3 from '../helpers/image.helper';
import { avatarFolder } from '../../config/aws.config';
import { ErrorResponse } from '../helpers/errorHandler.helper';

class UserController {
	uploadAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id, firstName, lastName } = req.user;
		const name = `${firstName}_${lastName}_${id}`;
		try {
			const avatar = await uploadS3(avatarFolder, req.file, name);
			if (!avatar) {
				next(new ErrorResponse(400, 'Could not update avatar'));
			}
			const user = await userRepository.updateById(id, { avatar });
			res.send(user);
		} catch (error) {
			res.status(400).send(error.message);
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
		const { email, id } = req.user;
		const { password } = await userRepository.getByEmail(email);
		try {
			if (!passwordValid(oldPassword, password)) {
				next(new ErrorResponse(404, 'Old password is incorrect'));
			}
			const changedPassword = hashPassword(newPassword);
			userRepository.updateById(id, { password: changedPassword });
			res.send({ message: 'Password was changed' });
		} catch (error) {
			res.status(400).send(error.message);
		}
	};

	getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;

		try {
			const user = await userRepository.getById(id);
			if (!user) {
				next(new ErrorResponse(404, 'User was not found'));
			}
			res.send(user);
		} catch (error) {
			res.status(404).send(error.message);
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
				next(new ErrorResponse(400, 'This email is already taken'));
			}
		}
		if (req.body.password) {
			next(new ErrorResponse(400, 'Forbidden to change password'));
		}
		try {
			const updatedUser = await userRepository.updateById(id, req.body);
			res.status(200).send(updatedUser);
		} catch (error) {
			res.status(400).send(error.message);
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
}

export default UserController;
