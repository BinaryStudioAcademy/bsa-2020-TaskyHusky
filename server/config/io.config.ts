import IO from 'socket.io';
import { Request, Response, NextFunction, Express } from 'express';
import { Server as HTTPServer } from 'http';
import { Types } from '../src/models/IO';

export class ConnectionHandler {
	public sockets: IO.Socket[] = [];

	protected type: string;

	public constructor(type: Types) {
		this.type = type;
	}

	public handle(io: IO.Server, socket: IO.Socket) {
		if (socket.handshake.query.type === this.type) {
			this.sockets.push(socket);

			socket.on('disconnect', () => {
				const index = this.sockets.findIndex((s) => s.id === socket.id);
				this.sockets.splice(index, 1);
			});
		}
	}

	public emit(type: string, ...values: any[]) {
		this.sockets.forEach((s) => s.emit(type, ...values));
	}
}

export const injectIO = (io: IO.Server) => (req: Request, res: Response, next: NextFunction) => {
	req.io = io;
	next();
};

export const configIO = (expressApp: Express, handlers: ConnectionHandler[] = []) => {
	const http = new HTTPServer(expressApp);
	const io = IO(http);
	const handle = (socket: IO.Socket) => handlers.forEach((h) => h.handle(io, socket));
	io.on('connect', handle);

	return { io, http };
};
