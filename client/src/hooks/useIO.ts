import connect from 'socket.io-client';
import { ioURL } from 'config/io.config';
import { useEffect, useState } from 'react';

export const useIO = (type: WebApi.IO.Types) => {
	const [io, setIO] = useState<SocketIOClient.Socket | undefined>();

	useEffect(() => {
		if (!io) {
			console.log('Try to connect');
			const newIO = connect(ioURL, { query: `type=${type}` });
			setIO(newIO);
		}

		return () => void io?.disconnect();
	}, [type, io]);

	// This is used to avoid memory leak
	// eslint-disable-next-line no-unused-expressions
	io?.removeAllListeners();
	return io;
};
