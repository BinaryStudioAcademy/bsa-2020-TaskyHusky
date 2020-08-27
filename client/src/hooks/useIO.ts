import connect from 'socket.io-client';
import { ioURL } from 'config/io.config';
import { useEffect, useState } from 'react';

export const useIO = (type: WebApi.IO.Types, handle: (io: SocketIOClient.Socket) => void) => {
	const [io, setIO] = useState<SocketIOClient.Socket | undefined>();

	useEffect(() => {
		if (!io) {
			const query = `type=${type}`;
			const newIO = connect(ioURL, { query, transports: ['websocket'] });
			setIO(newIO);
			handle(newIO);
		} else {
			io.removeAllListeners();
			handle(io);
		}
	}, [type, handle, io]);
};
