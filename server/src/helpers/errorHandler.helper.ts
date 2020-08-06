import express from 'express';
import HttpStatusCode from '../constants/httpStattusCode.constants';

export class ErrorResponse extends Error {
	public statusCode: HttpStatusCode | number;

	public message: string;

	constructor(statusCode: HttpStatusCode | number, message: string) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

export const handleError = (err: ErrorResponse, res: express.Response) => {
	const { statusCode, message } = err;

	res.status(statusCode).json({
		status: 'error',
		statusCode,
		message,
	});
};
