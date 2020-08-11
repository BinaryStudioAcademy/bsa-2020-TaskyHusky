import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';

const error404Middleware = (req: Request, res: Response, next: NextFunction) => {
	next(new ErrorResponse(HttpStatusCode.NOT_FOUND, 'This page does not exist'))
};

export default error404Middleware;
