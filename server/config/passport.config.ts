import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getCustomRepository } from 'typeorm';
import { jwtSecret } from './jwt.config';
import { authErrorMessages, EMAIL_FIELD } from '../src/constants/auth.constants';
import { hashPassword, passwordValid } from '../src/helpers/password.helper';
import { UserRepository } from '../src/repositories/user.repository';
import { IUser } from '../interfaces/User';

passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: EMAIL_FIELD,
		},
		async (email: string, password: string, next): Promise<void> => {
			const userRepository = getCustomRepository(UserRepository);
			const user = await userRepository.getByEmail(email);

			if (!user) {
				return next(new Error(authErrorMessages.INCORRECT_CREDENTIALS), null);
			}

			if (!passwordValid(password, user.password)) {
				return next(new Error(authErrorMessages.INCORRECT_CREDENTIALS), null);
			}

			return next(null, user);
		},
	),
);

passport.use(
	'register',
	new LocalStrategy(
		{
			usernameField: EMAIL_FIELD,
		},
		async (email: string, password: string, next): Promise<void> => {
			const userRepository = getCustomRepository(UserRepository);
			const checkingUser = await userRepository.getByEmail(email);

			if (checkingUser) {
				return next(new Error(authErrorMessages.TAKEN_EMAIL), null);
			}

			const encodedPassword = hashPassword(password);
			const newUserObject = userRepository.createNew({ email, password: encodedPassword });

			return next(null, newUserObject);
		},
	),
);

passport.use(
	'jwt',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtSecret,
		},
		async ({ id }: { id: string }, next): Promise<void> => {
			const userRepository = getCustomRepository(UserRepository);
			const user = await userRepository.getById(id);

			if (!user) {
				return next(new Error(authErrorMessages.NO_USER), null);
			}

			return next(null, user);
		},
	),
);

passport.serializeUser((user: IUser, next) => {
	next(null, { id: user.id });
});

passport.deserializeUser(async (id: string, next) => {
	const userRepository = getCustomRepository(UserRepository);
	const user = await userRepository.getById(id);
	next(null, user);
});

export default passport;
