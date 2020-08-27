import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';

export const validateRequestMw = (dtoClass: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (req.method === 'POST' || req.method === 'PUT') {
			const output = plainToClass(dtoClass, req.body);

			const errors = await validate(output, { skipMissingProperties: true });

			if (errors.length > 0) {
				const errorTexts = errors.map((item) => item.constraints).join(' ');

				next(new ErrorResponse(HttpStatusCode.BAD_REQUEST, `Request data is not valid: ${errorTexts}`));
			}
		}
		next();
	};
};
