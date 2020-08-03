import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { hashSync, compareSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const INCORRECT_CREDENTIALS_MESSAGE = 'incorrect email or password';
const TAKEN_EMAIL_MESSAGE = 'this email is already taken';
const EMAIL_FIELD = 'email';

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

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: EMAIL_FIELD
        },
        (email: string, password: string, next): void => {
            const checkingUser: MockUser | undefined = mockUsers.find((value: MockUser): boolean =>
                value.email === email);

            if (checkingUser) {
                return next(new Error(TAKEN_EMAIL_MESSAGE), null);
            }

            const encodedPassword = hashSync(password, 8);

            const newUserObject: MockUser = {
                id: uuidv4(),
                email,
                password: encodedPassword
            };

            mockUsers.push(newUserObject);
            next(null, newUserObject);
        }
    )
)

passport.serializeUser((user: MockUser, next) => {
    next(null, { id: user.id });
});

passport.deserializeUser((id: string, next) => {
    const user: MockUser | undefined = mockUsers.find((value: MockUser): boolean =>
        value.id === id);

    next(null, user);
});

export default passport;
