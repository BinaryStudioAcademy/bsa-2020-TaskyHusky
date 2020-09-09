import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { generateToken } from '../helpers/jwt.helper';
import { UserRepository } from '../repositories/user.repository';
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

	googleAuth = async (req: Request, res: Response) => {
		const { profileObj, tokenId } = req.body.data;
		const userRepository = getCustomRepository(UserRepository);
		try {
			const localUser: UserProfile | undefined = await userRepository.findOne({
				where: { email: profileObj.email },
			});
			if (localUser && !localUser.googleId) {
				throw new Error('Please enter login and password to sign in');
			}

			let user: UserProfile;
			if (!localUser) {
				const { googleId, imageUrl, email, givenName, familyName } = profileObj;
				const newUser = new UserProfile({
					googleId,
					firstName: givenName,
					password: tokenId,
					lastName: familyName,
					avatar: imageUrl,
					email,
				});
				user = await userRepository.createNew(newUser);
			} else {
				user = localUser;
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
