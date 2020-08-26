import IO from 'socket.io';
import { Request, Response, NextFunction, Express } from 'express';
import { Server as HTTPServer } from 'http';
import { Types } from '../src/models/IO';

export class ConnectionHandler {
	public sockets: IO.Socket[] = [];

	public type: string;

	public constructor(type: Types) {
		this.type = type;
	}

	public handle(io: IO.Server, socket: IO.Socket) {
		console.log(socket.handshake.query.type === this.type, socket.handshake.query.type, this.type);
		if (socket.handshake.query.type === this.type) {
			this.sockets.push(socket);
			console.log('added', socket.id);

			socket.on('disconnect', () => {
				console.log('removed', socket.id);
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
	const handle = (socket: IO.Socket) =>
		handlers.forEach((h) => {
			console.log(h.type);
			h.handle(io, socket);
		});
	io.on('connect', handle);

	return { io, http };
};
