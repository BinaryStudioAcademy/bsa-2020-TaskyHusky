import { connect } from 'socket.io-client';
import { ioURL } from 'config/io.config';
import { useEffect, useState } from 'react';

export const useIO = (type: string) => {
	const [io, setIO] = useState<SocketIOClient.Socket | undefined>();

	useEffect(() => {
		const newIO = connect(ioURL, { query: `type=${type}` });
		setIO(newIO);
	}, [type]);

	// This is used to avoid memory leak
	// eslint-disable-next-line no-unused-expressions
	io?.removeAllListeners();
	return io;
};
