import { Request, Response } from 'express';
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
}

export default AuthController;
