import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getCustomRepository } from 'typeorm';
import { isEmail } from 'class-validator';
import { jwtSecret } from './jwt.config';
import { authErrorMessages, EMAIL_FIELD } from '../src/constants/auth.constants';
import { hashPassword, passwordValid } from '../src/helpers/password.helper';
import { UserRepository } from '../src/repositories/user.repository';
import { UserModel } from '../src/models/User';
import { ErrorResponse } from '../src/helpers/errorHandler.helper';
import HttpStatusCode from '../src/constants/httpStattusCode.constants';
import { fixEmail } from '../src/helpers/fixEmail.helper';

passport.use(
	'local',
	new LocalStrategy(
		{
			usernameField: EMAIL_FIELD,
		},
		async (email: string, password: string, next): Promise<void> => {
			const trimmedEmail = fixEmail(email);

			if (!isEmail(trimmedEmail)) {
				return next(
					new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_EMAIL),
					null,
				);
			}

			const userRepository = getCustomRepository(UserRepository);
			const user = await userRepository.getByEmail(trimmedEmail);

			if (!user) {
				return next(
					new ErrorResponse(HttpStatusCode.UNAUTHORIZED, authErrorMessages.INCORRECT_CREDENTIALS),
					null,
				);
			}

			if (user.password && !passwordValid(password, user.password)) {
				return next(
					new ErrorResponse(HttpStatusCode.UNAUTHORIZED, authErrorMessages.INCORRECT_CREDENTIALS),
					null,
				);
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
			passReqToCallback: true,
		},
		async (req, email: string, password: string, next): Promise<void> => {
			const trimmedEmail = fixEmail(email);

			if (!isEmail(trimmedEmail)) {
				return next(
					new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, authErrorMessages.INVALID_EMAIL),
					null,
				);
			}

			const userRepository = getCustomRepository(UserRepository);
			const checkingUser = await userRepository.getByEmail(trimmedEmail);

			if (checkingUser) {
				return next(new ErrorResponse(HttpStatusCode.UNAUTHORIZED, authErrorMessages.TAKEN_EMAIL), null);
			}

			const encodedPassword = hashPassword(password);
			const newUserObject = await userRepository.createNew({
				...req.body,
				trimmedEmail,
				password: encodedPassword,
			});

			return next(null, newUserObject);
		},
	),
);

passport.use(
	'check_email',
	new LocalStrategy(
		{
			usernameField: EMAIL_FIELD,
			passwordField: EMAIL_FIELD, // DO NOT DELETE: LocalStrategy by default expects two arguments, in /check_email we send only email, this is a workaround
			passReqToCallback: true,
		},
		async (req, email: string, password: string, next): Promise<void> => {
			const userRepository = getCustomRepository(UserRepository);
			const user = await userRepository.getByEmail(email);

			if (!user) {
				return next(null, { email: '' });
			}

			return next(null, user);
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
				return next(new ErrorResponse(HttpStatusCode.UNAUTHORIZED, authErrorMessages.NO_USER), null);
			}

			return next(null, user);
		},
	),
);

passport.serializeUser((user: UserModel, next) => {
	next(null, { id: user.id });
});

passport.deserializeUser(async (id: string, next) => {
	const userRepository = getCustomRepository(UserRepository);
	const user = await userRepository.getById(id);
	next(null, user);
});

export default passport;
