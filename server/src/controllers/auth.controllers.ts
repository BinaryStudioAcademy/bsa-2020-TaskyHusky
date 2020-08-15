import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { generateToken } from '../helpers/jwt.helper';
import { UserRepository } from '../repositories/user.repository';
import { UserModel } from '../models/User';
import { UserProfile } from '../entity/UserProfile';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { getWebError } from '../helpers/error.helper';

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

	checkEmail = (req: Request, res: Response) => {
		const { email } = req.user;

		res.send({ email });
	};

	googleAuth = async (req: Request, res: Response) => {
		const { profileObj, tokenId } = req.body.data;
		const userRepository = getCustomRepository(UserRepository);
		try {
			const isUserExist = await userRepository.findOne({ where: { googleId: profileObj.googleId } });
			let user: UserProfile;
			if (!isUserExist) {
				const { googleId, imageUrl, email, givenName, familyName, id = '' } = profileObj;
				const newUser: UserModel = {
					id,
					googleId,
					firstName: givenName,
					password: tokenId,
					lastName: familyName,
					avatar: imageUrl,
					email,
				};
				user = await userRepository.createNew(newUser);
			} else {
				user = isUserExist;
			}
			const jwtToken = generateToken(user.id);
			res.send({ jwtToken, user });
		} catch (error) {
			res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send(
				getWebError(error, HttpStatusCode.UNPROCESSABLE_ENTITY),
			);
		}
	};
}

export default AuthController;
