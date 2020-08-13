import { Request, Response, NextFunction } from 'express';
import passport from '../../config/passport.config';

function isUrlInWhiteList(url: string, routesWhiteList:string[]) {

	return routesWhiteList.some((route: string) => {
		const regExpString =`^${route}$`.replace('*', '.*');
		const regExp = new RegExp(regExpString);

		return regExp.test(url);
	});
}

export const authenticateJwt = (routesWhiteList: string[]) =>
	(req: Request, res: Response, next: NextFunction) =>
		isUrlInWhiteList(req.originalUrl, routesWhiteList)
			? next()
			: passport.authenticate('jwt', { session: false })(req, res, next);

