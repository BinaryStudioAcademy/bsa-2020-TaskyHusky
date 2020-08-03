import { Request, Response, NextFunction } from 'express';
import { ErrorHandler, handleError } from '../helpers/errorHandler.helper/errorHandler.helper';

const errorHandlerMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
	handleError(err, res);
};

export default errorHandlerMiddleware;
