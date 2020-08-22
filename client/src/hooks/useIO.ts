import { connect } from 'socket.io-client';
import { ioURL } from 'config/io.config';
import { useEffect, useState } from 'react';

export const useIO = () => {
	const [io, setIO] = useState<SocketIOClient.Socket | undefined>();

	useEffect(() => {
		const newIO = connect(ioURL);
		setIO(newIO);
	}, []);

	return io;
};
