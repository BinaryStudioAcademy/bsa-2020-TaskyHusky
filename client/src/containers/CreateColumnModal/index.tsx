import React from 'react';
import Body, { Props } from './Body';
import { ContextProvider } from './logic/context';

const CreateColumnModal: React.FC<Props> = (props) => {
	return (
		<ContextProvider>
			<Body {...props} />
		</ContextProvider>
	);
};

export default CreateColumnModal;
