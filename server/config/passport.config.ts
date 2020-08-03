import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { hashSync, compareSync } from 'bcryptjs';

const INCORRECT_CREDENTIALS_MESSAGE = 'incorrect email or password';

export interface MockUser {
    id: string;
    email: string;
    password: string;
}

const mockUsers: MockUser[] = [{
    id: '1',
    email: 'test@test.com',
    password: hashSync('123456', 8)
}];

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        (email: string, password: string, next): void => {
            const user: MockUser | undefined = mockUsers.find((value: MockUser): boolean =>
                value.email === email);

            if (!user) {
                return next(new Error(INCORRECT_CREDENTIALS_MESSAGE), null);
            }

            if (!compareSync(password, user.password)) {
                return next(new Error(INCORRECT_CREDENTIALS_MESSAGE), null);
            }

            return next(null, user);
        }
    )
);

passport.serializeUser((user: MockUser, next) => {
    next(null, { id: user.id });
});

passport.deserializeUser((id: string, next) => {
    const user: MockUser | undefined = mockUsers.find((value: MockUser): boolean =>
        value.id === id);

    next(null, user);
});

export default passport;
