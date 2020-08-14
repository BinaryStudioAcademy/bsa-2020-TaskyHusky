import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
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

	getAllUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);

		try {
			const users = await userRepository.findAll();
			const { name: nameFilter } = req.query;
			if (nameFilter && typeof nameFilter === 'string') {
				res.send(users.filter((people) => {
						const fullName = `${people.firstName} ${people.lastName}`;
						return fullName.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1;
					}),
				);
			} else {
				res.send(users);
			}
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
				throw new Error('This email is already taken');
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
