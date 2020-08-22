import IO from 'socket.io';
import { Request, Response, NextFunction, Express } from 'express';
import { Server as HTTPServer } from 'http';

export type Handler = (io: IO.Server, socket: IO.Socket) => void;

export const injectIO = (io: IO.Server) => (req: Request, res: Response, next: NextFunction) => {
	req.io = io;
	next();
};

export const configIO = (expressApp: Express, handlers?: Handler[]) => {
	const http = new HTTPServer(expressApp);
	const io = IO(http);
	const handle = (socket: IO.Socket) => handlers?.forEach((h) => h(io, socket));
	io.on('connection', handle);

	return { io, http };
};
