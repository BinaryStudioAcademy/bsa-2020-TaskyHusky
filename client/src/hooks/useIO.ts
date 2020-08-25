import connect from 'socket.io-client';
import { ioURL } from 'config/io.config';
import { useEffect } from 'react';

export const useIO = (type: WebApi.IO.Types, handle: (io: SocketIOClient.Socket) => void) => {
	useEffect(() => {
		const query = `type=${type}`;
		const io = connect(ioURL, { query, reconnection: false });
		handle(io);

		return () => void io.disconnect();
	}, [type, handle]);
};
