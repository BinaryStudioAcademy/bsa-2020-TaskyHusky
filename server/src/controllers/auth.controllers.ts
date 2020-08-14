import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { generateToken } from '../helpers/jwt.helper';

class AuthController {
	sendUser = (req: Request, res: Response) => {
		const { password, ...user } = req.user; // write fields you want to exclude before '...user'
		const jwtToken = generateToken(user.id);
		res.send({ jwtToken, user });
	};

	sendExistingProfile = (req: Request, res: Response) => {
		const { password, ...user } = req.user;
		res.send(user);
	};

	checkEmail = async (req: Request, res: Response) => {
		const { email } = req.body;

		const userRepository = getCustomRepository(UserRepository);
		const user = await userRepository.getByEmail(email);

		if (user) {
			res.send({ email });
		}

		if (!user) {
			res.send({ email: '' });
		}
	};
}

export default AuthController;
