import { Request, Response, NextFunction } from 'express';
import passport from '../../config/passport.config';

export const authenticateJwt = (routesWhiteList: string[]) => {
	function isUrlInWhiteList(url: string) {

		return routesWhiteList.filter((route: string) => {
			const regExpString = '^'.concat(route).concat('$').replace('*', '.*');
			const regExp = new RegExp(regExpString);

			return regExp.test(url);
		}).length !== 0;
	}

	return (req: Request, res: Response, next: NextFunction) =>
		isUrlInWhiteList(req.originalUrl)
			? next()
			: passport.authenticate('jwt', { session: false })(req, res, next);
};
