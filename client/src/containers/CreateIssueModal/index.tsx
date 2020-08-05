import React from 'react';
import CreateIssueModalBody from './body';
import { ContextProvider } from './logic/context';
import { ControlsGetter } from './logic/types';

interface Props {
	children: ControlsGetter;
}

const CreateIssueModal: React.FC<Props> = ({ children }) => {
	return (
		<ContextProvider>
			<CreateIssueModalBody>{children}</CreateIssueModalBody>
		</ContextProvider>
	);
};

export default CreateIssueModal;
