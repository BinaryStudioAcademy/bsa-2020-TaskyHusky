import { Request, Response, NextFunction } from 'express';
import passport from '../../config/passport.config';

export const authenticateJwt = (routesWhiteList: string[]) =>
    (req: Request, res: Response, next: NextFunction) =>
        routesWhiteList.includes(req.originalUrl)
            ? next()
            : passport.authenticate('jwt', { session: false })(req, res, next);

export const logIn = passport.authenticate('local', { session: false });
export const register = passport.authenticate('register', { session: false });
