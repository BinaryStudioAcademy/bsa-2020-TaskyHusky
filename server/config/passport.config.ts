import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getCustomRepository } from 'typeorm';
import { jwtSecret } from './jwt.config';
import { authErrorMessages, EMAIL_FIELD } from '../src/constants/auth.constants';
import { hashPassword, passwordValid } from '../src/helpers/password.helper';
import { UserRepository } from '../src/repositories/user.repository';
import { UserModel } from '../src/models/User';
import { ErrorResponse } from '../src/helpers/errorHandler.helper';
import HttpStatusCode from '../src/constants/httpStattusCode.constants';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
			const userRepository = getCustomRepository(UserRepository);
			const checkingUser = await userRepository.getByEmail(email);

			if (checkingUser) {
				return next(new ErrorResponse(HttpStatusCode.UNAUTHORIZED, authErrorMessages.TAKEN_EMAIL), null);
			}

			const encodedPassword = hashPassword(password);
			const newUserObject = await userRepository.createNew({ ...req.body, email, password: encodedPassword });

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

passport.use('google', new GoogleStrategy({
	clientID: '1051291061989-cb9hska688bc3no26n701sr5dtahu300.apps.googleusercontent.com',
	clientSecret: 'dbYNWM1y6N5qlMSLjT6WkMKb',
	callbackURL: 'http://localhost:3000/api/auth/google/callback'
},
	function (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) {

		return done(null, profile);
	}
));

export default passport;
