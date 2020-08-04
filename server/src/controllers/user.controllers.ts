import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

class UserController {
	getUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;

		try {
			const user = await userRepository.getById(id);
			res.send(user);
		} catch (error) {
			res.status(401).send();
		}
	};

	updateUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;
		const data = req.body;

		try {
			const updatedUser = await userRepository.updateById(id, data);
			res.status(200).send();
		} catch (error) {
			res.status(401).send();
		}
	};

	deleteUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;

		try {
			await userRepository.deleteById(id);
			res.status(200).send();
		} catch (error) {
			res.status(401).send();
		}
	};
}

export default UserController;
