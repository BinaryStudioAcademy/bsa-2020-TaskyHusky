import { Handler } from '../../config/io.config';
import IO from 'socket.io';
import { Types } from '../models/IO';

const sockets: IO.Socket[] = [];

export const issue: Handler = (io, socket) => {
	if (socket.handshake.query.type === Types.Issue) {
		sockets.push(socket);

		socket.on('disconnect', () => {
			const index = sockets.findIndex((s) => s.id == socket.id);
			sockets.splice(index, 1);
		});
	}
};

export default sockets;
