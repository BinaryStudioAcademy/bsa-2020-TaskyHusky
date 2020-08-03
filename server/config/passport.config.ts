import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { hashSync, compareSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { jwtSecret } from './jwt.config';
import { authErrorMessages, EMAIL_FIELD } from '../src/constants/auth.constants';

export interface MockUser {
    id: string;
    email: string;
    password: string;
}

const mockUsers: MockUser[] = [{
    id: uuidv4(),
    email: 'test@test.com',
    password: hashSync('123456', 8)
}];

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: EMAIL_FIELD
        },
        (email: string, password: string, next): void => {
            const user = mockUsers.find(value => value.email === email);

            if (!user) {
                return next(new Error(authErrorMessages.INCORRECT_CREDENTIALS), null);
            }

            if (!compareSync(password, user.password)) {
                return next(new Error(authErrorMessages.INCORRECT_CREDENTIALS), null);
            }

            return next(null, user);
        }
    )
);

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: EMAIL_FIELD
        },
        (email: string, password: string, next): void => {
            const checkingUser = mockUsers.find(value => value.email === email);

            if (checkingUser) {
                return next(new Error(authErrorMessages.TAKEN_EMAIL), null);
            }

            const encodedPassword = hashSync(password, 8);

            const newUserObject: MockUser = {
                id: uuidv4(),
                email,
                password: encodedPassword
            };

            mockUsers.push(newUserObject);
            return next(null, newUserObject);
        }
    )
);

passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret
        },
        ({ id }: { id: string }, next) => {
            const user = mockUsers.find(value => value.id === id);

            if (!user) {
                return next(new Error(authErrorMessages.NO_USER), null);
            }

            return next(null, user);
        }
    )
)

passport.serializeUser((user: MockUser, next) => {
    next(null, { id: user.id });
});

passport.deserializeUser((id: string, next) => {
    const user = mockUsers.find(value => value.id === id);
    next(null, user);
});

export default passport;
