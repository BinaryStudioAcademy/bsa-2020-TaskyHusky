import express from 'express';
import HttpStatusCode from './httpStattusCode.helper';

export class ErrorHandler extends Error {
	public statusCode: HttpStatusCode | number;

	public message: string;

	constructor(statusCode: HttpStatusCode | number, message: string) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

export const handleError = (err: ErrorHandler, res: express.Response) => {
	const { statusCode = 400, message = 'unknown error detected' } = err;

	res.status(statusCode).json({
		status: 'error',
		statusCode,
		message,
	});
};
