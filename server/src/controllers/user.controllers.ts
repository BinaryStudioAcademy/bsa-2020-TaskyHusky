import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { passwordValid, hashPassword } from '../helpers/password.helper';
import { UserRepository } from '../repositories/user.repository';

class UserController {
	createUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { body } = req;

		try {
			const user = await userRepository.createNew(body);
			res.send(user);
		} catch (error) {
			const { status }: { status: number } = error;
			res.status(status);
		}
	};

	changePassword = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { oldPassword, newPassword } = req.body;

		try {
			const user = await userRepository.getByEmail(req.user.email);
			if (!passwordValid(oldPassword, user.password)) {
				throw new Error('Old password is incorrect');
			}
			const password = hashPassword(newPassword);
			userRepository.updateById(user.id, { password });
			res.send({ message: 'Password was changed' });
		} catch (error) {
			res.status(400).send(error.message);
		}
	};

	getUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;

		try {
			const user = await userRepository.getById(id);
			res.send(user);
		} catch (error) {
			res.status(404).send();
		}
	};

	updateUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.user;
		if (req.body.email) {
			const checkUser = await userRepository.getByEmail(req.body.email);
			if (checkUser && checkUser.id !== id) {
				throw new Error('Yhis email is already taken');
			}
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
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	};
}

export default UserController;
