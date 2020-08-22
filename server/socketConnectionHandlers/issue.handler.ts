import { Handler } from '../config/io.config';

export const issue: Handler = (io, socket) => {
	console.log(socket.id, 'connected');
	socket.on('disconnect', () => console.log(socket.id, 'disconnected'));
};
